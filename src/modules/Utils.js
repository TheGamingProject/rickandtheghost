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

    var sprite = new createjs.Sprite(ourAnimSpec.spritesheet,ourAnimSpec.starting);

    sprite.x = ourAnimSpec.location.x;
    sprite.y = ourAnimSpec.location.y;

   /* var listener;
    listener = sprite.on("animationend",function(evt,data){
      //sprite.removeEventListener("animationend", listener);

      if(callback) callback();
    },null, true)*/
    /* replaced by ^^
    listener = sprite.addEventListener("animationend", function(target, type, name, next){
      sprite.removeEventListener("animationend", listener);

      if(callback) callback();
    });
    */
    if(callback) callback();

    return sprite;
  }

  that.updateSprite = function(sprite, ourAnimSpec, animationFinishedCallback){
    if(!ourAnimSpec.spritesheet || !ourAnimSpec.starting)
      throw "invalid animSpec (update): "+ourAnimSpec;

    if(ourAnimSpec.location){
      if(typeof ourAnimSpec.location.x === "number")
        sprite.x = ourAnimSpec.location.x;
      if(typeof  ourAnimSpec.location.y === "number")
        sprite.y = ourAnimSpec.location.y;
    }

    sprite.spriteSheet = ourAnimSpec.spritesheet;

    var listener;
    listener = sprite.on("animationend",function(evt,data){
      //sprite.removeEventListener("animationend", listener);
      console.log("updated sprite animation finished: "+evt.name)

     // if(evt.name+"" === "null") debugger;
    //  sprite.stop();
      if(animationFinishedCallback) animationFinishedCallback();
    },null, true)


  //  console.log(sprite);
    //sprite.stop();
    if (ourAnimSpec.hax) sprite._animation = undefined;
    sprite.gotoAndPlay(ourAnimSpec.starting);
    console.log("started: "+ourAnimSpec.starting + " ["+sprite.currentAnimation+"]");

    //sprite.gotoAndPlay(ourAnimSpec.starting);

    return sprite;
  }



  return that;
});
