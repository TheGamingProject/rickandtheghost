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



    var doTimeBlock = function(timeblock){
      if(!timeblock)
        throw "null timeblock";

      switch(timeblock.type){
        case "intro":
          //always at the beginning of a timeline, is a unique traveling animation
          // -introAnim



          break;
        case "transition":
          //always walking in a direction,
          // changes x by some amount per second?
          // -facing

          break;
        case "oa":
          // -tag - identifies it to the ObjectAction

          break;

        default:
          throw "invalid timeblock type";
      }

      //attachables:

      //rickDialog
      //etcAnimation


    }


    return that;
  }

  return SceneTimeline;
});