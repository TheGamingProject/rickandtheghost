/**
 * Utils.js
 *
 * Created by niko on 12/15/13.
 */


define([],function (){
  var that = {}

  /*
    spritesheet: animations("alarmclock"),
    starting: "objectaction-setearly",
    location: {x:150,y:150}
  */

  /*  callbackshould be...
   function(target, type, name, next){

   }
   */

  that.makeSprite = function(ourAnimSpec, callback){
    if(!ourAnimSpec.spritesheet || !ourAnimSpec.starting || !ourAnimSpec.location)
      throw "invalid animSpec: "+ourAnimSpec;

    var sprite = createjs.Sprite(ourAnimSpec.spritesheet,ourAnimSpec.starting);

    sprite.x = ourAnimSpec.location.x;
    sprite.y = ourAnimSpec.location.y;

    var listener;
    listener = sprite.addEventListener("animationend", function(target, type, name, next){
      sprite.removeEventListener("animationend", listener);

      callback();
    });

    return sprite;
  }

  that.updateSprite = function(sprite, ourAnimSpec, callback){
    if(!ourAnimSpec.spritesheet || !ourAnimSpec.starting || !ourAnimSpec.location)
      throw "invalid animSpec (update): "+ourAnimSpec;

    sprite.x = ourAnimSpec.location.x;
    sprite.y = ourAnimSpec.location.y;

    sprite.spriteSheet = ourAnimSpec.spritesheet;
    sprite.gotoAndPlay(ourAnimSpec.starting);

    var listener;
    listener = sprite.addEventListener("animationend", function(target, type, name, next){
      sprite.removeEventListener("animationend", listener);

      callback();
    });

    return sprite;
  }



  return that;
});
