/**
 * SceneObject.js
 *
 * Created by niko on 12/14/13.
 */

define(["../Utils", "Loader"],function (Utils, Loader){
  var STATES = {
    idle: 0,
    beingclicked: 1, //showing list with options
    postclicked: 2  //cant reclick and change options
  }

  var DEFAULT_CHOICE = 2;// 3rd

  var SceneObject = function(parentStage, args, objectClickedCallback){
    var that;
    args = args || {};//args is definition via scene.js

    if(!parentStage)
      throw "null parentStage";//container

    // parse args
    if (!args.actionList || !args.idleAnimation || !args.clickBounds || !args.name)
      throw "bad args:" + args;

    //console.log(args);


    //private instance variables
    var state = STATES.idle;
    var choice = DEFAULT_CHOICE; //which objectAction was picked

    var myHoverAnimations;

    // object definition  and  set idle Animation
    //that = new createjs.Sprite(args.idleAnimation.spritesheet, args.idleAnimation.starting);// extends Sprite
    that = Utils.makeSprite(args.idleAnimation,function(){
      console.log("created objectSprite: "+args.name);
    })

    if(DEBUG.showClickArea){
      var b = args.clickBounds;
      debugArea = new createjs.Shape();
      debugArea.mouseEnabled = false;
      debugArea.graphics.beginFill(createjs.Graphics.getRGB(0,250,0,.2)).drawRect(b.x,b.y,b.w,b.h,.5);
      parentStage.addChild(debugArea);
    }


    //set location
    that.x = args.idleAnimation.location.x;
    that.y = args.idleAnimation.location.y;

    //setup actionList

    //set click size?
    var clickBounds = args.clickBounds;

    //setup hover animation
    var spritesheet = Loader.getAnimation(args.tag);

    var handleClick = function(evt){
      if(state == STATES.postclicked) return;

      // check if we are within the click
      if (evt.stageX >  clickBounds.x && evt.stageX <  clickBounds.x + clickBounds.w &&
          evt.stageY >  clickBounds.y && evt.stageY <  clickBounds.y + clickBounds.h){
        objectClickedCallback(that);// to edit ui. to populate ui

      }else{

      }

    };

    var handleHoverOn = function(evt){
      if(state == STATES.postclicked) return;

      Utils.updateSprite(that, {spritesheet: spritesheet, starting: "hover"});
    };

    var handleHoverOff = function(evt){
      if(state == STATES.postclicked) return;

      Utils.updateSprite(that, args.idleAnimation);
    };

    that.on("rollover", handleHoverOn, null, false, undefined);
    that.on("rollout", handleHoverOff, null, false, undefined);

    //handling click from parent? because im retarded (i want custom click-size)
    that.addEventListener("click", handleClick);


    //public functions
    that.getChoice = function(){
      return choice
    };
    that.setChoice = function(_choice){
      if(state === STATES.postclicked) return;

      if(!_choice){//this sets it to default if nothing was pressed during the scene
        if(state === STATES.postclicked)
          return;
        else{
          choice = 2;
          state = STATES.postclicked;
          return;
        }
      }

      choice = _choice;
      state = STATES.postclicked;
    };
    that.getObjDef = function(){
      return args;
    };
    that.getChoiceAction = function(){
      debugger;
      return args.actionList[choice];
    };

    return that;
  };

  return SceneObject
});