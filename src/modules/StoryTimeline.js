/**
 * StoryTimeline.js
 *
 * read and run all the storys here
 *
 * Created by niko on 12/16/13.
 */

define(["scenes/story", "SceneManager", "Scene"],function(story, SceneManager, Scene){


  var StoryTimeline = function(args){
    var that = {};

    var ourStory = args.story || story;
    //parse args (story.js)

    //private instance variables
    var currentScene;
    var currentNum = 0;


    // public functions


    //private helper functions
    /*var timelineRunner = function(){
      //blash
    };*/

    var startSceneHandler = function(key){
      console.log("startPlayScreen: "+ourStory.scenes[key]);

      currentNum = key;
      currentScene = new Scene( {sceneDef: SceneManager.getScene(ourStory.scenes[key]), parentStage: args.parentStage} );
      currentScene.startScene(exitSceneCallback);
    };

    var exitSceneCallback = function(){
      console.log("stopPlayScreen: "+ourStory.scenes[currentNum]);

      progressStory();
    }

    var startGoalScreenHandler = function(){
      console.log("startGoalScreen");

      startSceneHandler(0);
    }

    var endGoalScreenHandler = function(){
      console.log("endGoalScreen");
    }

    var progressStory = function(){
      console.log("progress: "+currentNum);

      var next = currentNum + 1;
      //if theres more do more
      if(ourStory.scenes[next])
        startSceneHandler(next);
      else
        endGoalScreenHandler();
    }

    var initStory = function(){
      //set vars based on scenes and goals?
      console.log("start Story! "+ourStory.name);

      //$.each([ourStory.scenes], function(key, value){
      startGoalScreenHandler()


      //});

    //  debugger;
    };



    initStory();

    return that;
  }


  return StoryTimeline ;
});