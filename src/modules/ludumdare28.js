//ludumdare28.js
//coded by @nikpoklitar

var GAME = {};
GAME.SIZE = { x: 1280, y: 720 };

var DEBUG = {showClickArea: true};


define(["Scene/Scene", "Scene/SceneManager", "storys/RatG/animations", "Player", "StoryTimeline", "Loader"],
    function(Scene, SceneManager, animations, Player, StoryTimeline, Loader){

  var STATES = {pregame: 0, ingame: 1, loading: 2};

  GAME.fps = 30;
  GAME.state;


  GAME.controls = {
    //for moving map
    enter: false
  };

  //temporary
  var preContainer;


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

  /*
    var spritesheet = animations.get("menuBG");
    tempPic = new createjs.Sprite(spritesheet,"afk");
    tempPic.x = 200;
    tempPic.y = 100;

    preContainer.addChild(tempPic);
  */

    GAME.stage.addChild(preContainer);
    //GAME.stage.update();


    setInterval(GAME.update, 1000 / GAME.fps);

  };

  //var tempPic;

  GAME.update = function(){

    switch(GAME.state){

      case STATES.pregame:
        if(true || GAME.controls.enter){
          GAME.state = STATES.ingame;
          GAME.startStory();
          preContainer.visible = false;
          console.log("end pregame state");
        }
        break;
      case STATES.ingame:



        break;
    }

    GAME.prevControls = GAME.controls;
  };

  GAME.startStory = function(){
    GAME.story = StoryTimeline({parentStage: GAME.stage});
    //GAME.currentScene = new Scene( {sceneDef: scene, parentStage: GAME.stage} );
    //GAME.currentScene.startScene();

  };
  GAME.resetGame = function(){
    console.log("reseting game");
    init();
    console.log("reset State: "+GAME.state)
  };

  GAME.click = function (loc){
    //can be delt with thru http://www.createjs.com/Docs/EaselJS/classes/DisplayObject.html#event_click
  };

  //process key presses
  GAME.keyPressed = function (evt){
    if(!evt) return;
    switch(evt.keyCode){
      case 13://enter
        GAME.controls.enter = true;
        break;
    }
  };
  //process key releases
  GAME.keyReleased = function (evt){
    if(!evt) return
    switch(evt.keyCode){
      case 13://enter
        GAME.controls.enter = false;
        break;

      case 82://r
        GAME.resetGame();
        break;
      case 77://m
//    togglemusic();
        break;
      case 27://esc
        //   gameplayobject.stopPlacing();
        break;
    }
  };

  ////////// MAIN /////////////
  var canvas;
  function init() {
    canvas = document.getElementById('myCanvas');
    canvas = new createjs.Stage(canvas);
    createjs.Ticker.addEventListener("tick", canvas);

    document.onkeydown = GAME.keyPressed;
    document.onkeyup = GAME.keyReleased;

    //load!

    console.log("loading");
    Loader.doLoadScreen(
        canvas,
        ["rickglobal","ricka1s1","alarmclock","switch","poster", "windowrays"],
        ["assets/scenes/a1s1/background.png"],
        function(){
          console.log("done loading");
          GAME.init(canvas);
        }
    );

  }

  console.log("init-ing");
  init();
});
