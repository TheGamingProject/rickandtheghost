/**
 * SceneTimeline.js
 *
 * Created by niko on 12/15/13.
 */


define(["Scene", "Utils"],function (Scene, Utils){
  var STATES = {
    pre: 0,
    inIntro: 1,
    inTransition: 2,
    inObjAction: 3,
    over: 4
  };

  var SceneTimeline = function(sceneObjects, timelineDef){
    var that = {};

    // args should be an array starting with type:intro,
    //  then a series of transitions and objectaction animations
    var parseArgs = function(){

    };
    parseArgs();

    //private instance variables
    var state = STATES.pre;
    var animationNum = 0;

    var rickSprite;

    that.start = function(endCallback){
      state = STATES.inIntro;


      /*$.each(timelineDef, function(index, timeblock){
        doTimeBlock(timeblock);
      });*/

      doTimeBlock(timelineDef[1], function(){
        console.log("done timeblock 1");
      });



      if(endCallback && typeof endCallback === "function")
        endCallback();

      state = STATES.over;
    }

    var doTimeBlock = function(timeblock, callback){//callback to start the next timeblock

      if(!timeblock)
        throw "null timeblock";


      var part1;
      switch(timeblock.type){
        case "intro":
          //always at the beginning of a timeline, is a unique traveling animation
          // -introAnim
          // fixed frames


          break;
        case "transition":
          //always walking in a direction,
          // changes x by some amount per second? (walk speed)
          // -facing
          // -distance



          break;
        case "oa":
          // -tag - identifies it to the ObjectAction
          // fixed amount of frames

          // we want to use ObjectAction(as animator) and make rick sprite not visible

          part1 = function(callbackFromMainloop){
            var objAction = sceneObjects[timeblock.tag].getChoiceAction();

            Utils.updateSprite(sceneObjects[timeblock.tag], objAction.oaAnimation, function(){
              console.log("after oa animation");
              callbackFromMainloop();
              uiUpdateCallback();
            });


          };


          break;

        default:
          throw "invalid timeblock type";
      }
      //event listenr
      /*addEventListener("animationend", function(target, type, name, next){

      });*/

      //attachables:
      var part2;

      //rickDialog
      //etcAnimation
      if(timeblock.rickDialog && typeof rickDialog === "object"){
        $.each(timeblock.rickDialog, function(index, value){//value = def
          //start a timeout that displays stuff

        });
      }


      return function(cb){
        if(part1 && typeof part1 === "function")
          part1(cb);
        if(part2 && typeof part2 === "function")
          part2();

      }(callback);
    }

    that.getState = function(){
      return state;
    }

    that.getStateObj = function(){
      return {
        state: state
      };
    }

    var uiCallback;
    var uiUpdateCallback = function(){
      if(uiCallback) uiCallback(that.getStateObj());
    };

    that.addUiCallback = function(callback){
      uiCallback = callback;
    }



    return that;
  }

  return SceneTimeline;
});