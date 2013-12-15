/**
 * List everything about an Animation here
 * - http://www.createjs.com/Docs/EaselJS/classes/SpriteSheet.html
 * Created by niko on 12/14/13.
 */



define([],function(){
  var animations = {}

  //spritesheet - http://www.createjs.com/Docs/EaselJS/classes/SpriteSheet.html
  animations.menuBG = {
    framerate: 1,
    images: ["assets/monkey.jpg"],
    //frames: {width: 232, height: 217, count: 1},
    frames: {width: 25, height: 100, count: 5},
    animations: {
      afk: [1,2,3,4,5] //incorrect
    }
  };

  animations.alarmclock = {
    framerate: 33,
    images: ["assets/a1s1/alarmclock.png"],
    frames: {width: 300, height: 300, count: 90},
    animations: {
      idle: {
        frames: [0]
      },

      "reaction-setearly": [10,39, false],
      "reaction-turnoff": [40,54, false], //post-click,
      "objectaction-setearly": [60,69], //
      "objectaction-turnoff": [70,79], //
      "objectaction-abstain": [80,89] //

    }

  };

  var animationFactory = function(name){
    if(!animations[name]){
      console.log("Animation doesn't exist: "+name);
      //throw "Animation doesn't exist: "+name;
    }
    return new createjs.SpriteSheet(animations[name]);
  }

  return animationFactory;
});