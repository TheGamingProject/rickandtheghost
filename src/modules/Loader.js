/**
 * Loader.js
 *
 * User: @nikpoklitar
 * Date: 12/18/13
 * Time: 9:55 AM
 *
 */

define(["storys/RatG/animations"],function(animations){
  var LOAD_CHECK_TIME = 1000; //ms
  var LOADING_UPDATE = 10; //for loading screen TODO rename the variable

  var that = {};

  var stills = {};
  var spriteSheets = {};


  that.doLoadScreen = function(parentContainer, listOfStills, listOfAnimations, finishedLoadingCallback){
    //make a new container and add it to parent
    var loadingContainer = new createjs.Container();
    parentContainer.addChild(loadingContainer);

    //start loading all resources
    var totalResources = listOfStills.length + listOfAnimations.length;
    var finishedLoadingCount = 0;

    var individualLoadingCallback = function(evt, resource){
      ////////  update load bar //////////
    if(!resource) debugger;



      //loop thru every pixel, or group of pixels??
   //   for(var x=0 ; x< GAME.SIZE.x; x += 5){
   //     for(var y=0; y < GAME.SIZE.y; y += 5){
      //  console.log((y * GAME.SIZE.x + x) % totalResources + " "+ finishedLoadingCount);
      //    if((y * GAME.SIZE.y + x) % totalResources === finishedLoadingCount){
            var gap = GAME.SIZE.y / totalResources;
            var rectangle = new createjs.Shape();
            rectangle.graphics.beginFill("white").drawRect(0, finishedLoadingCount * gap, GAME.SIZE.x, gap);
            loadingContainer.addChild(rectangle);
            console.log("finished loaded: "+resource +" ["+finishedLoadingCount+"]");
            finishedLoadingCount++
      //      console.log("win: "+x+", "+y + " cause: "+(y * GAME.SIZE.y + x) );
    //      }
    //    }
    //  }

      //and the ones that ..  (totalPixels % totalResources === finshedLoadingCount)

      ////////////////////////////////////
    } ;


    that.loadAnimations(listOfStills, undefined, individualLoadingCallback);
    that.loadStills(listOfAnimations, undefined, individualLoadingCallback);


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

    setTimeout(function(){
      checkIfEverythingsLoaded();
    }, 10);

  };

  //TODO rewrite generically to include stills/animations
  that.loadAnimations = function(listOfAnimationNames, allAnimationsLoadedCallback, individualLoadedCallback){
    var total = 0;
    $.each(listOfAnimationNames,function(index, value){
      if(!animations[value]){
        //does not exist in animations.js TODO to be replaced  into scene filestructure
        console.log("resource does not exist")
        return;
      }

      if(spriteSheets[value] && spriteSheets[value].complete){
        console.log("already loaded: "+value);
        individualLoadedCallback();
        return;//already loaded
      }

      if(spriteSheets[value]){
        //currently loading
        return;
      }

      console.log("loading spritesheet: "+value);


      spriteSheets[value] = new createjs.SpriteSheet(animations[value]);
      if (individualLoadedCallback)      {
        if(spriteSheets[value].complete)
          individualLoadedCallback(undefined, value);
        else
          spriteSheets[value].on("complete", individualLoadedCallback, null, false, value);
      }
    //  if(value === "motiv")
    //    debugger;



    });

    if(typeof allAnimationsLoadedCallback === "function")
      setTimeout(function(){

        do{
          var not = false;
          $.each(listOfAnimationNames,function(index, value){
            if(!spriteSheets[value].complete)
              not = true;
          })
        }while(not);

        loaded = true;
        allAnimationsLoadedCallback();
      },LOAD_CHECK_TIME);


  };

  that.loadStills = function(listOfStills, allStillsLoadedCallback, individualLoadedCallback){
    var total = 0;
    $.each(listOfStills,function(index, value){
      /*if(!animations[value]){
        //does not exist in stills object
        return;
      } */

      if(spriteSheets[value] && !spriteSheets[value].complete)
       return individualLoadedCallback(undefined, value);//already loaded   */

      if(spriteSheets[value])
      //currently loading
        return;

      console.log("loading still: "+value);
      var imageObj = new Image();
      imageObj.onload = function(){
        imageObj.complete = true;
        if (individualLoadedCallback) individualLoadedCallback(undefined, value);
      };
      imageObj.src = value;

      stills[value] = imageObj;

    });

    if(typeof allStillsLoadedCallback === "function")
      setTimeout(function(){

        do{
          var not = false;
          $.each(listOfStills,function(index, value){
            if(!stills[value].complete)
              not = true;
          })
        }while(not);

        loaded = true;
        allStillsLoadedCallback();
      },LOAD_CHECK_TIME);
  };

  that.get = function(resourceName){
    if(!animations[resourceName]){
      throw "Animation doesn't exist: "+resourceName;
    }
    if(spriteSheets[resourceName]){
      console.log("getting cached spritesheet:" +resourceName);
      return spriteSheets[resourceName];
    }
    console.log("flyloading spritesheet:"+resourceName);
    spriteSheets[resourceName] = new createjs.SpriteSheet( animations[resourceName]);

    return spriteSheets[resourceName];
  };

  that.getStill = function(resourceName){
    if(stills[resourceName]){
      console.log("getting cached still: "+resourceName)
      return stills[resourceName];
    }

    console.log("flyloading still: "+resourceName);

    var imageObj = new Image();
    imageObj.onload = function(){};
    imageObj.src = resourceName;


    stills[resourceName] = imageObj;
    return stills[resourceName];
  };

  return that;
});