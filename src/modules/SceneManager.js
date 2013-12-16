/**
 * Created by niko on 12/14/13.
 */


define([ "scenes/scene1", "scenes/scene2"],function(scene1, scene2){
  var that = {};

  that.getScene = function(sceneName){
    switch(sceneName){
      case "scene1":
        return scene1;
      case "scene2":
        return scene2;
      default:
        throw "We don't have that scene";
    }
  }

  return that;
});