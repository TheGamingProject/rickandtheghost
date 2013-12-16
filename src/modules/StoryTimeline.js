/**
 * StoryTimeline.js
 *
 * read and run all the storys here
 *
 * Created by niko on 12/16/13.
 */

define(["scenes/story"],function(story){


  var StoryTimeline = function(args){
    var that = {};

    var args = args || story;
    //parse args (story.js)

    //private instance variables

    // public functions


    //private helper functions
    var timelineRunner = function(){

    };

    var startSceneHandler = function(){

    };

    var stopSceneHandler = function(){

    }

    var startGoalScreenHandler = function(){

    }

    var endGoalScreenHandler = function(){

    }

    var initStory = function(){
      //set vars based on scenes and goals?

    };



    initStory();

    return that;
  }


  return StoryTimeline ;
});