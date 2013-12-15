/**
 * SceneTimeline.js
 *
 * Created by niko on 12/15/13.
 */


define(["Scene"],function (Scene){
  var STATES = {
    pre: 0,
    inIntro: 1,
    inTransition: 2,
    inObjAction: 3,
    over: 4
  };

  var SceneTimeline = function(args){
    var that;

    // args should be an array starting with type:intro,
    //  then a series of transitions and objectaction animations
    var parseArgs = function(){

    };
    parseArgs();

    //private instance variables
    var state = STATES.pre;
    var animationNum = 0;

    var rickSprite;


    var doTimeBlock = function(timeblock){
      if(!timeblock)
        throw "null timeblock";

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


          break;

        default:
          throw "invalid timeblock type";
      }
      //event listenr
      addEventListener("animationend", function(target, type, name, next){

      });

      //attachables:

      //rickDialog
      //etcAnimation
      if(timeblock.rickDialog && typeof rickDialog === "object"){
        $.each(timeblock.rickDialog, function(index, value){//value = def
          //start a timeout that displays stuff

        });
      }

    }


    return that;
  }

  return SceneTimeline;
});