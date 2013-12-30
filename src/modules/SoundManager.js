/**
 * SoundManager.js
 *
 * Created by niko on 12/29/13.
 */

define([], function(){

  var mute;
  var that = {};

  var bgMusicInstance;

  that.playSoundEffect = function(soundClipName){
    if(mute) return;

    console.log("playing SoundEffect: "+soundClipName);

    var instance = createjs.Sound.play(soundClipName);  // play using id.  Could also use full sourcepath or event.src.
    instance.addEventListener("complete", createjs.proxy(function(){
      console.log("soundEffectEnded: "+soundClipName);
      instance = null;
    }, this));
    instance.volume = 0.8;
  };

  //would be used for scenes and
  that.playBackgroundMusic = function(musicClipName){
    if(mute) return;

  };

  //pauses background music if any is playing
  that.pauseBackgroundMusic = function(){

  };

  that.loadMuteSettings = function(){
    mute = false;
    //TODO load from local settings
  };

  that.toggleMute = function(){
    that.setMute(!mute);
  };
  that.setMute = function(enabled){
    mute = enabled;

    if(mute)
      ;//kill bgMusicInstance?
  };

  that.loadMuteSettings();

  return that;
});