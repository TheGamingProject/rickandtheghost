/**
 * List everything about an Animation here
 * - http://www.createjs.com/Docs/EaselJS/classes/SpriteSheet.html
 * Created by niko on 12/14/13.
 */



define([],function(){
  var animations = {}

  //http://www.createjs.com/Docs/EaselJS/classes/Sprite.html

  animations.menuBG = //new createjs.SpriteSheet(
    //spritesheet - http://www.createjs.com/Docs/EaselJS/classes/SpriteSheet.html
    {
      framerate: 1,
      images: ["assets/monkey.jpg"],
      //frames: {width: 232, height: 217, count: 1},
      frames: {width: 25, height: 100, count: 5},
      animations: {
        afk: [1,2,3,4,5]
      }

    }//,
    //frameOrAnimation
//    0

  //)
  ;

  var animationFactory = function(name){
    if(!animations[name]){
      throw "Animation doesn't exist: "+name;
    }
    return new createjs.SpriteSheet(animations[name]);
  }

  return animationFactory;
});