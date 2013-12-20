/**
 * Loader.js
 *
 * User: @nikpoklitar
 * Date: 12/18/13
 * Time: 9:55 AM
 *
 */

define(["animations"],function(animations){
  var LOAD_CHECK_TIME = 1000; //ms

  var that = {};

  var stills = {};
  var spriteSheets = {};


  that.doLoadScreen = function(listOfStills, listOfAnimations){


  };

  //TODO rewrite generically to include stills/animations
  that.loadAnimations = function(listOfAnimationNames, callback){
    var total = 0;
    $.each(listOfAnimationNames,function(index, value){
      if(!animations[value]){
        //does not exist in animations.js TODO to be replaced
        console.log("resource does not exist")
        return;
      }
      if(spriteSheets[value]){
         //currently loading
        return;
      }
      /*if(spriteSheets[value] && !spriteSheets[value].complete){
        console.log("attempting to reload: "+value+" NO!");
        return;//already loaded
      } */

      console.log("loading spritesheet: "+value);
      spriteSheets[value] = new createjs.SpriteSheet(animations[value]);

    });

    if(typeof callback === "function")
      setTimeout(function(){

        do{
          var not = false;
          $.each(listOfAnimationNames,function(index, value){
            if(!spriteSheets[value].complete)
              not = true;
          })
        }while(not);

        loaded = true;
        callback();
      },LOAD_CHECK_TIME);


  };

  that.loadStills = function(listOfStills, callback){
    var total = 0;
    $.each(listOfStills,function(index, value){
      /*if(!animations[value]){
        //does not exist in stills object
        return;
      } */
      if(spriteSheets[value])
      //currently loading
        return;
      /*if(spriteSheets[value] && !spriteSheets[value].complete)
       return;//already loaded   */

      console.log("loading still: "+value);
      var imageObj = new Image();
      imageObj.onload = function(){
        imageObj.complete = true;
      };
      imageObj.src = value;

      stills[value] = imageObj;

    });

    if(typeof callback === "function")
      setTimeout(function(){

        do{
          var not = false;
          $.each(listOfStills,function(index, value){
            if(!stills[value].complete)
              not = true;
          })
        }while(not);

        loaded = true;
        callback();
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