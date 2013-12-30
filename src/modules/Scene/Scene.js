/**
 * Created by niko on 12/14/13.
 *
 * Scene.js
 */
define(["Scene/SceneObject", "Scene/SceneTimeline","Utils", "Scene/SceneTimer", "Fader", "Scene/SceneOptionsUI", "SoundManager"],
    function (SceneObject, SceneTimeline, Utils, SceneTimer, Fader, SceneOptionsUI, SoundManager){

  var STATES = {
    preinit: -1,
    haunting: 0,
    rickAction: 1
  };

  //ui locations

  var SCENE_STATE_INDICATOR = {
    x: 0,
    y: 0,
    path : {
      haunting: "assets/ui/state-haunting.png",
      recording: "assets/ui/state-recording.png"
    }
  }

  var UI_BOTTOM = {
    x: 0,
    y: 500,
    w: GAME.SIZE.x,
    h: GAME.SIZE.y - 500,
    path: "assets/ui/lowerbar.png"
  };

  var CONTINUE_BUTTON = {
    path: "assets/ui/arrow0.png",
    x: 580,
    y: 572,
    w: 0,
    h: 0
  };

  var UI_STATS_COORD = [{
    x: 10, y: 520, tag: "suspense"
  },{
    x: 210, y: 520, tag: "goodday"
  },{
    x: 410, y: 520, tag: "scared"
  }];

  var TIMELINE_UI_TEXT = {
    x: 800, y:20
  };

  //page 52 the goood parts
  var Scene = function(args){
    var that;
    args = args || {};

    // parse args
    var sceneDef = args.sceneDef; // from modules/scenes/scene.js
    if (!sceneDef) throw "No defined scene";
    sceneDef = sceneDef();

    var parentStage = args.parentStage;
    if (!parentStage) throw "No parentStage";

    //private instance variables
    var state = STATES.preinit;
    var timeline;
    var sceneObjects = {};


    //ui variables
    var sceneContainer;
    var backgroundSprite,
      objectLayerContainer,
      uiLayerContainer;
    var continueButton;
    var sceneStateIndicator = []; //holds haunting/recording bitmaps

    var sceneOptionsUIContainer;
    var rickSprite;

    var statsMeterText = [];
    var sceneTimelineText;

    var debugText;

    // object definition
    that = {};

 // object methods / public variables
    that.init = function(){
      //constructor?
      sceneContainer = new createjs.Container();

      //debug text
      debugText = new createjs.Text("State: ", "20px Arial", "#ff7700");
      debugText.x = 100;
      debugText.y = 30;
      debugText.textBaseline = "alphabetic";
      sceneContainer.addChild(debugText);

      //parse sceneDef
      parseSceneDef();

      /////// fader    ////////////
      var aFader = Fader();
      SceneTimer.setFaderObject(aFader);
      SceneTimer.setStartFadeColor(sceneDef.startFade || {r: 0, g: 0, b: 0, o: 0});
      sceneContainer.addChild(aFader);

      //////// setup UI ////////////
      setupUI();




      parentStage.addChild(sceneContainer);
      console.log("Scene init-ed: "+sceneDef.name);

      SceneTimer.setExitSceneCallback(that.endScene );

    };

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

    };

    //parse and create the scene
    var parseSceneDef = function(){
      backgroundSprite = new createjs.Bitmap(sceneDef.background.path);
      backgroundSprite.x = 0;
      backgroundSprite.y = 0;
      sceneContainer.addChild(backgroundSprite);

      objectLayerContainer = new createjs.Container();
      objectLayerContainer.setBounds(0,0,GAME.SIZE.x,GAME.SIZE.y);
      sceneContainer.addChild(objectLayerContainer);

      //make rick
      rickSprite = Utils.makeSprite(sceneDef.startingIdle);
      //rickSprite.stop();


      //create objects
      var objects = sceneDef.objects;
      if(!objects) throw "No objects defined in scene: "+sceneDef.name;

      $.each(objects, function(index, object){
        var objectSprite = SceneObject(sceneContainer, object, objectClickedCallback);//object and objectSprite
        sceneObjects[object.tag] = objectSprite;
        objectLayerContainer.addChild(objectSprite);
      });

      objectLayerContainer.addChild(rickSprite);

      //timeline stuff
      timeline = SceneTimeline(rickSprite, sceneObjects, sceneDef.animationTimeline);
      timeline.addUiCallback(sceneTimelineUiCallback);


      SceneTimer.startTimer(sceneDef.startSceneTimerDef);
    };

    ////////// ui stuff //////////

    var setupUI = function(){
      uiLayerContainer = new createjs.Container();
      uiLayerContainer.setBounds(UI_BOTTOM.x,UI_BOTTOM.y,UI_BOTTOM.w,UI_BOTTOM.h);

      var bottomRect = new createjs.Bitmap(UI_BOTTOM.path);
      bottomRect.x = UI_BOTTOM.x;
      bottomRect.y = UI_BOTTOM.y;
      uiLayerContainer.addChild(bottomRect);

      //continue button
      continueButton = new createjs.Bitmap(CONTINUE_BUTTON.path);
      continueButton.x = CONTINUE_BUTTON.x;
      continueButton.y = CONTINUE_BUTTON.y;
      continueButton.addEventListener("click",function(){
        console.log("continue button clicked");
        SoundManager.playSoundEffect("continueButtonClick");
        finishHaunting();
      });
      uiLayerContainer.addChild(continueButton);

      //scene states indicator
      sceneStateIndicator["haunting"] = new createjs.Bitmap(SCENE_STATE_INDICATOR.path.haunting);
      sceneStateIndicator["recording"] = new createjs.Bitmap(SCENE_STATE_INDICATOR.path.recording);
      sceneStateIndicator["haunting"].x = sceneStateIndicator["recording"].x = SCENE_STATE_INDICATOR.x;
      sceneStateIndicator["haunting"].y = sceneStateIndicator["recording"].y = SCENE_STATE_INDICATOR.y;
      uiLayerContainer.addChild(sceneStateIndicator["haunting"]);
      uiLayerContainer.addChild(sceneStateIndicator["recording"]);

      //add meter stats
      $.each(UI_STATS_COORD, function(index, value){
        var newLabel;
        newLabel = new createjs.Text("T: 0", "20px Arial", "#ff7700");
        newLabel.x = value.x;
        newLabel.y = value.y;
        newLabel.textBaseline = "alphabetic";
        newLabel.tag = value.tag;

        statsMeterText.push(newLabel);
        uiLayerContainer.addChild(newLabel);
      });

      GAME.player.addChangeStatCallback(function (){
        // to update labels
        $.each(statsMeterText, function(index, value){
          value.text = UI_STATS_COORD[index].tag+": "+GAME.player.getStat(value.tag);
        });
      });

      //set SceneTimer container (for fades and dialog)
      SceneTimer.setObjectContainer(objectLayerContainer);
      SceneTimer.setUIContainerForDialog(uiLayerContainer);

      //adding SceneOptionsUI
      sceneOptionsUIContainer = SceneOptionsUI({});
      uiLayerContainer.addChild(sceneOptionsUIContainer);

      //clicking anywhere else should unselect the current selectedObject via SceneOptionsUI
      bottomRect.addEventListener("click", function(){
        sceneOptionsUIContainer.clearSelectedObject();
      });
      backgroundSprite.addEventListener("click", function(){
        sceneOptionsUIContainer.clearSelectedObject();
      });

      sceneContainer.addChild(uiLayerContainer);

      //more debug text
      if(DEBUG.sceneState){
        sceneTimelineText = new createjs.Text("timeline debug text", "20 Arial", "#0000FF");
        sceneTimelineText.x = TIMELINE_UI_TEXT.x;
        sceneTimelineText.y = TIMELINE_UI_TEXT.y;
        sceneTimelineText.textBaseline = "alphabetic";
        sceneContainer.addChild(sceneTimelineText);
      }
    };

    var objectClickedCallback = function(sceneObject){
      if(state === STATES.haunting){
        SoundManager.playSoundEffect("objectSelectClick");
        sceneOptionsUIContainer.setSelectedObject(sceneObject);
      }
    };

    var sceneTimelineUiCallback = function(stateObj){
      if (sceneTimelineText)
        sceneTimelineText.text = ""+JSON.stringify(stateObj);
    };


    var exitSceneCallback;

    that.startScene = function(_exitSceneCallback){
      exitSceneCallback = _exitSceneCallback;
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
      sceneOptionsUIContainer.clearSelectedObject();

      sceneStateIndicator["haunting"].visible = false;
      sceneStateIndicator["recording"].visible = true;

      //start animation chain
      timeline.start();
    };

    that.endScene = function(){
      //clean up sprites? background
      parentStage.removeChild(sceneContainer);

      console.log("Scene exited");

      if(exitSceneCallback) exitSceneCallback();
    };

    that.getState = function(){
      return state;
    };

    that.init();

    return that;
  };

  return Scene ;
});