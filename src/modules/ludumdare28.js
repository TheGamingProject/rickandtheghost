//ludumdare28.js
//coded by @nikpoklitar
define([],function(){

  var STATES = {pregame: 0, ingame: 1};

  var GAME = {};

  GAME.fps = 30;
  GAME.state = STATES.pregame;
  GAME.gameplayObject;

  GAME.controls = {
      //for moving map
      up: false,
      down: false,
      left: false,
      right: false,

      f: false,
      m: false,
      r: false,
      j: false //jarlsberg
  };
  GAME.prevControls = {};


  GAME.init = function(canvas){
      GAME.stage = new createjs.Stage(canvas);

      drawStuff(GAME.stage);

      //load shit?

     // GAME.gameplayObject = new GamePlay();


      setInterval(GAME.update, 1000 / GAME.fps);
  };


  GAME.update = function(){


      switch(GAME.state){
          case STATES.pregame:



              break;
          case STATES.ingame:
              //update controls

              //update game-logic
                  gameplayObject.update()
              //draw graphics
                  gameplayObject.draw()
              break;
      }

      GAME.prevControls = GAME.controls;
  };


  //process key presses
  GAME.keyPressed = function (evt){
      switch(evt.keyCode){
          case 87://w
          case 38://up
              GAME.controls.up = true;
              break;
          case 83://s
          case 40://down
              GAME.controls.down = true;
              break;
          case 65://a
          case 37://left
              GAME.controls.left = true;
              break;
          case 68://d
          case 39://right
              GAME.controls.right = true;
              break;
          case 74://J
              GAME.controls.j = true;
              break;
      }
  };
  //process key releases
  GAME.keyReleased = function (evt){
      switch(evt.keyCode){
          case 87://w
          case 38://up
              GAME.controls.up = false;
              break;
          case 83://s
          case 40://down
              GAME.controls.down = false;
              break;
          case 65://a
          case 37://left
              GAME.controls.left = false;
              break;
          case 68://d
          case 39://right
              GAME.controls.right = false;
              break;
          case 82://r
              resetGame();
              break;
          case 77://m
              togglemusic();
              break;
          case 27://esc
              gameplayobject.stopPlacing();
              break;
          case 70://f
              gameplayobject.toggleSpeed();
              break;
          case 74://j
              GAME.controls.j = false;
              break;
      }
  };



  function drawStuff(stage){
      //Create a stage by getting a reference to the canvas
      // stage = new createjs.Stage("demoCanvas");
      //Create a Shape DisplayObject.
      circle = new createjs.Shape();
      circle.graphics.beginFill("red").drawCircle(0, 0, 40);
      //Set position of Shape instance.
      circle.x = circle.y = 50;
      //Add Shape instance to stage display list.
      stage.addChild(circle);
    
    var container = new createjs.Container();
    container.x = 20;
    container.y = 20;
    stage.addChild(container);
    
    circle = new createjs.Shape();
    circle.graphics.beginFill("black").drawCircle(2,2,10);
    container.addChild(circle);
    
    
      circle = new createjs.Shape();
      circle.graphics.beginFill("blue").drawCircle(0, 0, 25);

      circle.x = circle.y = 60;
      stage.addChild(circle);




      //Update stage will render next frame
      stage.update();
  }
  
            var canvas;
        var stage;
        function init() {
            canvas = document.getElementById('myCanvas');

            GAME.init(canvas);
        }

        init();
});
