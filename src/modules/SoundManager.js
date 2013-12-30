/**
 * SoundManager.js
 *
 * Created by niko on 12/29/13.
 */

define([], function(){

  var that = {};

  that.playSoundEffect = function(soundClipName){
    console.log("playing SoundEffect: "+soundClipName);

    var instance = createjs.Sound.play(soundClipName);  // play using id.  Could also use full sourcepath or event.src.
    instance.addEventListener("complete", createjs.proxy(function(){
      console.log("soundEffectEnded: "+soundClipName);
      instance = null;
      createjs.Sound.play(soundClipName);
    }, this));
    instance.volume = 0.5;
  };

  //would be used for scenes and
  that.playBackgroundMusic = function(musicClipName){

  };

  //pauses background music if any is playing
  that.pauseBackgroundMusic = function(){

  };

  that.setMute = function(enabled){

  };

  return that;
});