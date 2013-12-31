//ludumdare28.js
//coded by @nikpoklitar

var GAME = {};
GAME.SIZE = { x: 1280, y: 720 };

var DEBUG = {showClickArea: true};


define(["Scene/Scene", "Scene/SceneManager", "storys/RatG/animations", "Player", "StoryTimeline", "Loader", "Utils", "storys/RatG/assets"],
    function(Scene, SceneManager, animations, Player, StoryTimeline, Loader, Utils, ourAssets){

  var STATES = {pregame: 0, ingame: 1, loading: 2};

  GAME.fps = 30;
  GAME.state;


  GAME.controls = {
    //for moving map
    enter: false
  };

  //temporary
  var preContainer;

  var viewThisScene = Utils.getURLParameter("scene");
  console.log("SceneViewing: "+viewThisScene);

  GAME.init = function(canvas){
    GAME.stage = canvas;
    GAME.state = STATES.pregame;

    //load shit?


    GAME.player = Player();

    //GAME.state = STATES.pregame;
    preContainer = new createjs.Container();

    var rectangle = new createjs.Shape();
    rectangle.graphics.beginFill("black").drawRect(0,0,GAME.SIZE.x,GAME.SIZE.y);
    preContainer.addChild(rectangle);

    GAME.stage.addChild(preContainer);


    //start scene
    currentScene = new Scene( {sceneDef: SceneManager.getScene(viewThisScene), parentStage: GAME.stage} );
    currentScene.startScene(function(){
      console.log("Scene Ended");
    });
  };





  ////////// MAIN /////////////
  var canvas;
  function init() {
    canvas = document.getElementById('myCanvas');
    canvas = new createjs.Stage(canvas);
    createjs.Ticker.addEventListener("tick", canvas);


    //load!

    var ourStillsToBeLoaded = ourAssets.stills;
    var ourSoundsToBeLoaded = ourAssets.sounds;

    console.log("loading");
    Loader.doLoadScreen(
      canvas,
      ourStillsToBeLoaded,
      ourSoundsToBeLoaded,
      function(){
        console.log("done loading");
        GAME.init(canvas);
      }
    );

  }

  console.log("init-ing");
  init();
});
