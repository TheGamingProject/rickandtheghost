/**
 * Created by niko on 12/14/13.
 */


define([ "scenes/scene1", "scenes/scene2", "scenes/scene4"],function(scene1, scene2, scene4){
  var that = {};

  that.getScene = function(sceneName){
    switch(sceneName){
      case "scene1":
        return scene1;
      case "scene2":
        return scene2;
      case "scene4":
        return scene4;
      default:
        throw "We don't have that scene";
    }
  }

  return that;
});