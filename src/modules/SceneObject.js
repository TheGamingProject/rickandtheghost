/**
 * SceneObject.js
 *
 * Created by niko on 12/14/13.
 */

define([],function (){
  var STATES = {
    idle: 0,
    beingclicked: 1, //showing list with options
    postclicked: 2  //cant reclick and change options
  }

  var SceneObject = function(parentStage, args, optionsUiCallback){
    var that;
    args = args || {};//args is definition via scene1.js

    if(!parentStage)
      throw "null parentStage";//container

    // parse args
    if (!args.actionList || !args.idleAnimation || !args.clickBounds || !args.name)
      throw "bad args:" + args;

    console.log(args);


    //private instance variables
    var state = STATES.idle;
    var choice; //which objectAction was picked

    // object definition  and  set idle Animation
    that = new createjs.Sprite(args.idleAnimation.spritesheet, args.idleAnimation.starting);// extends Sprite

    //set location
    that.x = args.idleAnimation.location.x;
    that.y = args.idleAnimation.location.y;

    //setup actionList

    //set click size?
    var clickBounds = args.clickBounds;

    var handleClick = function(evt){
      if(state == STATES.postclicked) return;

      // check if we are within the click
      if (evt.stageX >  clickBounds.x && evt.stageX <  clickBounds.x + clickBounds.w &&
          evt.stageY >  clickBounds.y && evt.stageY <  clickBounds.y + clickBounds.h){
        optionsUiCallback(that);// to edit ui. to populate ui
        parentStage.hit = true;


      }else{

      }

    };

    //parentStage.addEventListener("click", handleClick);
    //parentStage.addChild(that);
    //I think there is a bug, so we have to use abuse the system?
    parentStage.addEventListener("click", handleClick);


    //public functions
    that.getChoice = function(){
      return choice
    };
    that.setChoice = function(_choice){
      if(state = STATES.postclicked) return;
      that.choice = _choice;
      state = STATES.postclicked;
    }
    that.getObjDef = function(){
      return args;
    }

    return that;
  };

  return SceneObject
});