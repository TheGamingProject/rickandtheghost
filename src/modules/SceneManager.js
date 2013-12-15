/**
 * Created by niko on 12/14/13.
 */


define([ "scenes/scene1"],function(scene1){
  var that = {};

  that.getScene = function(sceneName){
    switch(sceneName){
      case "scene1":
        return scene1;
        break;
      default:
        throw "We don't have that scene";
    }
  }

  return that;
});