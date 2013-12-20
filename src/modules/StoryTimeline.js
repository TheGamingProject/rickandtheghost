/**
 * StoryTimeline.js
 *
 * read and run all the storys here
 *
 * Created by niko on 12/16/13.
 */

define(["storys/RatG/story", "Scene/SceneManager", "Scene/Scene"],function(story, SceneManager, Scene){
  var RECIEVE_GOAL_BG = {
    path: "assets/start/startSuspicionLow.png"
  };

  var END_GOAL_BG = {
    path: "assets/end/endneutral.png"
  };

  var CONTINUE_BUTTON = {
    x: 600, y:700,
    path: "assets/ui/arrow0.png"
  }


  var StoryTimeline = function(args){
    var that = {};

    var ourStory = args.story || story;
    //parse args (story.js)

    //private instance variables
    var currentScene;
    var currentNum = 0;

    if (!args.parentStage) throw "wtffffffffffff. no parent stage!!! in StoryTimeline...";

    var parentStage = args.parentStage;



    // public functions


    //private helper functions
    /*var timelineRunner = function(){
      //blash
    };*/

    var startSceneHandler = function(key){
      console.log("startPlayScreen: "+ourStory.scenes[key]);

      currentNum = key;
      currentScene = new Scene( {sceneDef: SceneManager.getScene(ourStory.scenes[key]), parentStage: parentStage} );
      currentScene.startScene(exitSceneCallback);
    };

    var exitSceneCallback = function(){
      console.log("stopPlayScreen: "+ourStory.scenes[currentNum]);

      progressStory();
    }

    var startGoalScreenHandler = function(){
      console.log("startGoalScreen");

      var tempBG = new createjs.Bitmap(RECIEVE_GOAL_BG.path);
      tempBG.x = 0;
      tempBG.y = 0;

      parentStage.addChild(tempBG);

      tempBG.on("click",function(){
        console.log("next plz");

        parentStage.removeChild(tempBG);


        startSceneHandler(0);
      },null, true)


    }

    var endGoalScreenHandler = function(){
      console.log("endGoalScreen");

      var tempBG = new createjs.Bitmap(END_GOAL_BG.path);
      tempBG.x = 0;
      tempBG.y = 0;

      parentStage.addChild(tempBG);

      tempBG.on("click",function(){
        console.log("restart");

        parentStage.removeChild(tempBG);


        startSceneHandler(0);
      },null, true)
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

      startGoalScreenHandler()

    };

    initStory();

    return that;
  }


  return StoryTimeline ;
});