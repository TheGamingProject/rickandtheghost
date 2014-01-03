/**
 * Loader.js
 *
 * User: @nikpoklitar
 * Date: 12/18/13
 * Time: 9:55 AM
 *
 */

define(["storys/RatG/animations", "LoadScreen"], function(animations, LoadScreen){
//  var LOADING_UPDATE = 10; //for loading screen TODO rename the variable

  var that = {};

  var loadScreen;

  var stills = {};
  var spriteSheets = {};

  var loadedList = {};

  var queue = new createjs.LoadQueue();
  queue.installPlugin(createjs.Sound);

  createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
  createjs.Sound.alternateExtensions = ["mp3"];

  // Public Functions

  that.doLoadScreen = function(parentContainer, listOfStills, listOfSounds, finishedLoadingCallback){
    var totalResources = 0;

    //find all animations from animations.js
    var listOfAnimations = [];
    $.each(animations, function(key, value){
      var path = value.images[0];
      listOfAnimations.push({id: path, src: path});
    });

    var loadList = [];
    $.merge(loadList, listOfAnimations);
    $.merge(loadList, listOfStills);
    totalResources = loadList.length + listOfSounds.length;

    //callback defs
    var individualLoadingCallback = function(evt){
      var resource = evt.item;
      if(!resource.id) debugger;

      if(loadScreen)
        loadScreen.progressByOneResource(resource.id);

      console.log("finished loaded: "+resource.id +" ["+loadScreen.getLoadedCount()+"]");

      loadedList[resource.id] = resource;
    };

    //check when everythings loaded
    var allLoadedCallback = function(){
      var loadedCount = loadScreen.getLoadedCount();
      if(loadedCount > totalResources){
        throw "wtf, how did this happen!?";
      } else if (loadedCount === totalResources){ //when everythings loaded...
        //remove the container from parent, and call the callback
        loadScreen.removeFromParent();

        return finishedLoadingCallback(); //dont forget to break out of this timeout-spawning loop
      }
    };

    //init the loadscreen
    loadScreen = LoadScreen({id: "default", "parentContainer": parentContainer, "totalResources": totalResources});

    //then start the load
    that.startLoad(loadList, listOfSounds, allLoadedCallback, individualLoadingCallback);
  };

  that.startLoad = function(imageList, soundList, allLoadedCallback, individualLoadedCallback){
    queue.on("fileload", individualLoadedCallback, this);
    queue.on("complete", allLoadedCallback, this);
    $.each(soundList, function(key, value){
      queue.loadFile(value);
    });

    queue.loadManifest(imageList);
  };

  //TODO redo these get functions sometime, they look ugly
  that.getAnimation = function(resourceName){
    if(!animations[resourceName]){
      throw "Animation doesn't exist: "+resourceName;
    }
    if(spriteSheets[resourceName]){
      console.log("getting cached spritesheet:" +resourceName);
      return spriteSheets[resourceName];
    }
    console.log("(not-fly) loading spritesheet:"+resourceName); //still making a spritesheet but using cached image
    spriteSheets[resourceName] = new createjs.SpriteSheet( animations[resourceName]);

    return spriteSheets[resourceName];
  };

  that.getStill = function(resourceName){
    if(stills[resourceName]){
      console.log("getting cached still: "+resourceName)
      return stills[resourceName];
    }

    console.log("(not-fly)loading still: "+resourceName);

    var imageObj = new Image();
    //imageObj.onload = function(){};
    imageObj.src = resourceName;


    stills[resourceName] = imageObj;
    return stills[resourceName];
  };

  //dont need a getSound() because SoundJS knowz

  that.getResourceInfo = function(args){
    var resourceName = args.resourceName;
    if (!resourceName)
      throw "no resourceName";

    var type = args.type; //sound, animation, or still

    var resource = loadedList[resourceName];
    if(!resource /* TODO or if not loaded */)
      return null;

    if(!type)
      return resource;

    if (type === resource.type)
      return resource;

    debugger;
    return null;
  };

  return that;
});