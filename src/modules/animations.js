/**
 * List everything about an Animation here
 * - http://www.createjs.com/Docs/EaselJS/classes/SpriteSheet.html
 * Created by niko on 12/14/13.
 */



define([],function(){
  var animations = {}

  //http://www.createjs.com/Docs/EaselJS/classes/Sprite.html

  animations.menuBG = //new createjs.Sprite(
    //spritesheet - http://www.createjs.com/Docs/EaselJS/classes/SpriteSheet.html
    {
      framerate: 1,
      images: ["../assets/monkey.jpg"],
      frames: {width: 232, height: 217, count: 1},
/*
      animations: {
        afk: [0]
      }
*/
    }//,
    //frameOrAnimation
//    0

 // )
  ;

  //return an array of all the definitions {}
  return animations;
});