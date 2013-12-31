/**
 * Loader.js
 *
 * User: @nikpoklitar
 * Date: 12/18/13
 * Time: 9:55 AM
 *
 */

define(["storys/RatG/animations"], function(animations){
  var LOAD_CHECK_TIME = 1000; //ms
  var LOADING_UPDATE = 10; //for loading screen TODO rename the variable

  var that = {};

  var stills = {};
  var spriteSheets = {};

  var loadedList = {};

  var queue = new createjs.LoadQueue();
  queue.installPlugin(createjs.Sound);

  createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
  createjs.Sound.alternateExtensions = ["mp3"];

  that.doLoadScreen = function(parentContainer, listOfStills, listOfSounds, finishedLoadingCallback){
    //make a new container and add it to parent
    var loadingContainer = new createjs.Container();
    parentContainer.addChild(loadingContainer);

    //start loading all resources
    var totalResources = 0;
    var finishedLoadingCount = 0;

    var individualLoadingCallback = function(evt){
      var resource = evt.item;
      if(!resource.id) debugger;

      ////////  update load bar //////////
      var gap = GAME.SIZE.y / totalResources;
      var rectangle = new createjs.Shape();
      rectangle.graphics.beginFill("white").drawRect(0, finishedLoadingCount * gap, GAME.SIZE.x, gap);
      loadingContainer.addChild(rectangle);
      ////////////////////////////////////

      console.log("finished loaded: "+resource.id +" ["+finishedLoadingCount+"]");
      finishedLoadingCount++;

      loadedList[resource.id] = resource;
    };

    //find all animations from animations.js
    var listOfAnimations = [];
    $.each(animations, function(key, value){
      var path = value.images[0];
      listOfAnimations.push({id: path, src: path});
    });

    var loadList = [];
    $.merge(loadList, listOfAnimations);
    $.merge(loadList, listOfStills);

    //check when everythings loaded
    var checkIfEverythingsLoaded = function(){
      LOADING_UPDATE
      if(finishedLoadingCount > totalResources){
        throw "wtf, how did this happen!?";
      } else if (finishedLoadingCount === totalResources){
        //when everythings loaded...
        //remove the container from parent, and call the callback
        parentContainer.removeChild(loadingContainer);
        finishedLoadingCallback();

        return; //dont forget to break out of this timeout-spawning loop
      }

      setTimeout(checkIfEverythingsLoaded, LOADING_UPDATE);
    };

    totalResources = loadList.length + listOfSounds.length;
    that.startLoad(loadList, listOfSounds, checkIfEverythingsLoaded, individualLoadingCallback);
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