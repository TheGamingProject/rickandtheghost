/**
 * Loader.js
 *
 * User: @nikpoklitar
 * Date: 12/18/13
 * Time: 9:55 AM
 *
 */

define(["animations"],function(animations){
  var that = {};

  var stills = {};
  var spriteSheets = {};

  that.doLoadScreen = function(listOfStills, listOfAnimations){


  };

  that.loadAnimations = function(listOfAnimationNames, callback){
    var total = 0;
    $.each(listOfAnimationNames,function(index, value){
      if(!animations[value]){
        //does not exist in animations.js TODO to be replaced
        return;
      }
      if(spriteSheets[value])
         //currently loading
        return;
      /*if(spriteSheets[value] && !spriteSheets[value].complete)
        return;//already loaded   */
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
      },1000);


  }

  that.loadStills = function(listOfStills, callback){

  }

  that.get = function(resourceName){
    if(!animations[resourceName]){
      throw "Animation doesn't exist: "+resourceName;
    }
    if(spriteSheets[resourceName]){
      console.log("getting cached spritesheet:" +resourceName);
      return spriteSheets[resourceName];
    }
    console.log("loading spritesheet:"+resourceName);
    spriteSheets[resourceName] = new createjs.SpriteSheet( animations[resourceName]);

    return spriteSheets[resourceName];
  }


  return that;
});