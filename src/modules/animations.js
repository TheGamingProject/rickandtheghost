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
    framerate: 1,
    images: ["assets/a1s1_alarmclock.png"],
    frames: {width: 50, height: 50, count: 170},
    animations: {
      idle: {
        frames: [0]
      },
      "reaction-turnoff": [10,15,"idle",1], //post-click,
      "reaction-setearly": [20,39,"idle",1],
      "objectaction-turnoff": [40,79,"idle",1], //
      "objectaction-setearly": [80,109,"idle",1], //do nothing and activate
      "objectaction-abstain": [110,149,"idle",1] //disabled

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