/**
 * Created by niko on 12/14/13.
 *
 * Scene.js
 */
define([],function (){

  var STATES = {
    preinit: -1,
    haunting: 0,
    rickAction: 1
  };

  //ui locations

  var CONTINUE_BUTTON = {
    x: 350,
    y: 400,
    w: 0,
    h: 0
  }


  //page 52 the goood parts
  var Scene = function(args){
    var that;
    args = args || {};

    // parse args
    var sceneDef = args.sceneDef; // from modules/scenes/scene1.js
    if (!sceneDef) throw "No defined scene";

    var parentStage = args.parentStage;
    if (!parentStage) throw "No parentStage";

    //private instance variables
    var state = STATES.preinit;


    //ui variables
    var sceneContainer;
    var continueButton;

    var debugText;

    // object definition
    that = {};

 // object methods / public variables
    that.init = function(){
      //constructor?
      sceneContainer = new createjs.Container();

      //temp backdrop
      var rectangle = new createjs.Shape();
      rectangle.graphics.beginFill("green").drawRect(0,0,800,600);
      sceneContainer.addChild(rectangle);


      //button
      continueButton = new createjs.Bitmap("assets/continueButton.png");
      continueButton.x = CONTINUE_BUTTON.x;
      continueButton.y = CONTINUE_BUTTON.y;
      continueButton.addEventListener("click",function(evt){
        console.log("continue button clicked");
        finishHaunting(evt);
      });
      sceneContainer.addChild(continueButton);

      //debug text
      debugText = new createjs.Text("State: ", "20px Arial", "#ff7700");
      debugText.x = 100;
      debugText.y = 30;
      debugText.textBaseline = "alphabetic";
      sceneContainer.addChild(debugText);


      parentStage.addChild(sceneContainer);
      console.log("Scene init-ed: "+sceneDef.name);
    }

    var setState = function(_state){
      switch(_state){
        case STATES.haunting:
          debugText.text = "haunting";
          break;
        case STATES.rickAction:
          debugText.text = "rickAction";
          break;
        default:
          throw "invalid state: "+_state;
      }
      state = _state;
      console.log("Scene State change: "+debugText.text);

    }

    that.click = function(loc){
      if(state != STATE.haunting)
        return;

      //we might call clickObject
      //are we clicking a object?

      //are we clicking continueButton?

    }

    var clickObject = function(name){
      //trigger showing list
    };

    that.startScene = function(){
      setState(STATES.haunting);

      //you can now click on objects
      // set objects clickable..

      //show continue button
    };

    //finish haunting, start RickAction stuff
    var finishHaunting = function(){
      setState(STATES.rickAction);

      //hide button
      continueButton.visible = false;

      //start animation chain
    };
   /*
    var clickContinueButton = function(){

    }*/

    that.endScene = function(){
      //clean up sprites? background
      parentStage.removeChild(sceneContainer);
    };

    that.getState = function(){
      return state;
    }

    that.init();

    return that;
  };


  console.log("Scene loaded")
  return Scene ;
});