/**
 * Created by niko on 12/14/13.
 *
 * Scene.js
 */
define([],function (){

  var STATES = {
    preinit: -1,
    haunting: 0,
    rickAction: 1
  };

  //ui locations

  var CONTINUE_BUTTON = {
    x: 0,
    y: 0,
    w: 0,
    h: 0
  }


  //page 52 the goood parts
  var Scene = function(args){
    var that;
    args = args || {};

    // parse args
    var sceneDef = args.sceneDef; // from modules/scenes/scene1.js
    if (!sceneDef) throw "No defined scene";

    //private instance variables
    var state = STATES.preinit;

    var continueButton = CONTINUE_BUTTON;

    // object definition
    that = {};

    // object methods / public variables
    that.click = function(loc){
      if(state != STATE.haunting)
        return;

      //we might call clickObject
      //are we clicking a object?

      //are we clicking continueButton?

    }

    var clickObject = function(name){
      //trigger showing list
    };

    that.startScene = function(){
      state = STATES.haunting;

      //you can now click on objects

      //show continue button
    };

    that.finishHaunting = function(){
      state = STATES.rickAction;

      //start animation chain
    };

    that.endScene = function(){
      //clean up sprites? background
    };

    that.getState = function(){
      return state;
    }

    return that;
  };

  console.log("Scene loaded")
  return Scene;
});