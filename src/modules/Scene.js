/**
 * Created by niko on 12/14/13.
 *
 * Scene.js
 */
define(["SceneObject", "SceneTimeline","Utils", "SceneTimer"],function (SceneObject, SceneTimeline, Utils, SceneTimer){

  var STATES = {
    preinit: -1,
    haunting: 0,
    rickAction: 1
  };

  //ui locations

  var UI_BOTTOM = {
    x: 0,
    y: 500,
    w: GAME.SIZE.x,
    h: GAME.SIZE.y - 500,
    path: "assets/ui/lowerbar.png"
  };

  var CONTINUE_BUTTON = {
    path: "assets/ui/arrow0.png",
    x: 575,
    y: 572,
    w: 0,
    h: 0
  };

  var UI_OPTION_TITLE = { // alarm clock
    x: 600, y: 525
  }

  var UI_OPTION_BUTTONS = [{
    x: 775, y: 545, w: 400, h: 50
  },{
    x: 775, y: 595, w: 400, h: 50
  },{
    x: 775, y: 645, w: 400, h: 50
  }];

  var UI_STATS_COORD = [{
    x: 10, y: 500, tag: "suspense"
  },{
    x: 210, y: 500, tag: "goodday"
  },{
    x: 410, y: 500, tag: "scared"
  }];

  var TIMELINE_UI_TEXT = {
    x: 800, y:20
  }

  //page 52 the goood parts
  var Scene = function(args){
    var that;
    args = args || {};

    // parse args
    var sceneDef = args.sceneDef; // from modules/scenes/scene1.js
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

    var rickSprite;

    var selectedObject;
    var objectActionTitleText;
    var uiOptionsText = [];
    var statsMeterText = [];
    var sceneTimelineText;

    var debugText;

    // object definition
    that = {};

 // object methods / public variables
    that.init = function(){
      //constructor?
      sceneContainer = new createjs.Container();

      //temp backdrop
    /*  var rectangle = new createjs.Shape();
      rectangle.graphics.beginFill("green").drawRect(0,0,GAME.SIZE.x,GAME.SIZE.y);
      sceneContainer.addChild(rectangle);
    */


      //debug text
      debugText = new createjs.Text("State: ", "20px Arial", "#ff7700");
      debugText.x = 100;
      debugText.y = 30;
      debugText.textBaseline = "alphabetic";
      sceneContainer.addChild(debugText);

      //beginning-tricky (doing tricky thing to see if nothign else is clicked)
      sceneContainer.addEventListener("click", function(){
        if (!tricky2)
          sceneContainer.hit = false;
      });

      //parse sceneDef
      parseSceneDef();

      //////// setup UI ////////////
      setupUI();

      SceneTimer.setStartFade(sceneDef.startFade || {r: 0, g: 0, b: 0, o: 0});

      //ending-tricky
      sceneContainer.addEventListener("click", function(){
        if(!sceneContainer.hit){
          didntClickaObject();
        }
        tricky2 = false;
      });

      parentStage.addChild(sceneContainer);
      console.log("Scene init-ed: "+sceneDef.name);

      SceneTimer.setExitSceneCallback(function(){
        console.log("Scene exited");
      });

    }

    var tricky2 = false;

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

    //parse and create the scene
    var parseSceneDef = function(){
      backgroundSprite = new createjs.Bitmap(sceneDef.background.path);
      backgroundSprite.x = 0;
      backgroundSprite.y = 0;
      sceneContainer.addChild(backgroundSprite);

      objectLayerContainer = new createjs.Container();
      objectLayerContainer.setBounds(0,0,GAME.SIZE.x,GAME.SIZE.y);
      sceneContainer.addChild(objectLayerContainer)

      //make rick
      rickSprite = Utils.makeSprite(sceneDef.startingIdle);
      //rickSprite.stop();


      //create objects
      var objects = sceneDef.objects;
      if(!objects) throw "No objects defined in scene: "+sceneDef.name;

      for(var o in objects){
        var object = objects[o];

        var objectSprite = SceneObject(sceneContainer, object, optionsUiCallback);//object and objectSprite
        sceneObjects[object.tag] = objectSprite;
        objectLayerContainer.addChild(objectSprite);

      }

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

     // var purpleRect = new createjs.Shape();
     // purpleRect.graphics.beginFill("purple").drawRect(UI_BOTTOM.x,UI_BOTTOM.y,UI_BOTTOM.w,UI_BOTTOM.h);
      var bottomRect = new createjs.Bitmap(UI_BOTTOM.path);
      bottomRect.x = UI_BOTTOM.x;
      bottomRect.y = UI_BOTTOM.y;
      uiLayerContainer.addChild(bottomRect);

      //continue button
      continueButton = new createjs.Bitmap(CONTINUE_BUTTON.path);
      continueButton.x = CONTINUE_BUTTON.x;
      continueButton.y = CONTINUE_BUTTON.y;
      continueButton.addEventListener("click",function(evt){
        console.log("continue button clicked");
        finishHaunting(evt);
      });
      uiLayerContainer.addChild(continueButton);


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

      //set timer container
      SceneTimer.setUIContainerForDialog(uiLayerContainer);
      SceneTimer.setObjectContainer(objectLayerContainer)



      GAME.player.addChangeStatCallback(function (){
        // to update labels
        $.each(statsMeterText, function(index, value){
          value.text = UI_STATS_COORD[index].tag+": "+GAME.player.getStat(value.tag);
        });
      });

      //action list

      //debug text
      objectActionTitleText = new createjs.Text("UI_OPTION_TITLE", "20px Arial", "#ff7700");
      objectActionTitleText.x = UI_OPTION_TITLE.x;
      objectActionTitleText.y = UI_OPTION_TITLE.y;
      objectActionTitleText.textBaseline = "alphabetic";
      uiLayerContainer.addChild(objectActionTitleText);

      var helper = function (i){
        return function(e){
          //mid tricky
          sceneContainer.hit = true;
          tricky2 = true;
          //console.log("hit");

          if(selectedObject)
            selectObjectAction(i);
        };
      };

      for(var i=0; i<3; i++){
        var b = UI_OPTION_BUTTONS[i];

        var buttonRect = new createjs.Shape();
        var buttonRect = new createjs.Shape();
        buttonRect.graphics.beginFill("black").drawRect(b.x,b.y,b.w,b.h);



        buttonRect.addEventListener("click", helper(i));

        uiOptionsText[i] = new createjs.Text("option "+i, "24px RBNo2", "#ffffff");
        uiOptionsText[i].x = b.x + 5;
        uiOptionsText[i].y = b.y + 25;
        uiOptionsText[i].textBaseline = "alphabetic";

        uiLayerContainer.addChild(buttonRect);
        uiLayerContainer.addChild(uiOptionsText[i]);
      }

      //more debug text
      sceneTimelineText = new createjs.Text("timeline debug text", "20 Arial", "#0000FF");
      sceneTimelineText.x = TIMELINE_UI_TEXT.x;
      sceneTimelineText.y = TIMELINE_UI_TEXT.y;
      sceneTimelineText.textBaseline = "alphabetic";

      uiLayerContainer.addChild(sceneTimelineText);
/*
      objectLayerContainer.addEventListener("click",function(evt){
        //clicking anywhere else should unselect SceneObject
        resetOptionsUI();
      });
*/
      sceneContainer.addChild(uiLayerContainer);
    }

    var resetOptionsUI = function(){
      console.log("ui reset");

      objectActionTitleText.text = "UI_OPTION_TITLE";
      selectedObject = undefined;

      for(var t in uiOptionsText){
        uiOptionsText[t].text = "option _";
      }
    }

    var sceneTimelineUiCallback = function(stateObj){
      if (sceneTimelineText)
        sceneTimelineText.text = ""+JSON.stringify(stateObj);
    }

    var optionsUiCallback = function( sceneObject){
      /*if(!sceneObject)*/ resetOptionsUI();

      if(state != STATES.haunting)
        return;

      var objDef = sceneObject.getObjDef()
      objectActionTitleText.text = objDef.name;
      selectedObject = sceneObject;

      for(var a in objDef.actionList){
        var action = objDef.actionList[a];
        console.log(a+ ": "+action.description);
        uiOptionsText[a].text = a + ": "+action.description;

      }

      console.log("object clicked");
    }

    var didntClickaObject = function(){
      resetOptionsUI();

    };

    /*
     { //action 1
     description: "turn off the alarm clock",
     meterStatAffected: {
     suspense: +1
     },
     postAnimation: scene.animations["turnoffAlarmClock"],  //from scene.animations, optional
     oaAnimation: {  //animation for during RickAction phase
     spritesheet: animations("alarmclock"),
     starting: "objectaction-turnedoff",
     location: {x:150,y:150}
     }
     }
     */
    var selectObjectAction = function(actionNum){
      if (!selectedObject)
        throw "invalid Object String";
      var objDef = selectedObject.getObjDef();
      //var sceneObj = sceneDef.objects[selectedObject.getObjDef().tag];
      console.log("Selected Object:" + objDef.name +": action-"+actionNum);

      if(actionNum != 2)
        selectedObject.setChoice(actionNum);

      //apply stats
      GAME.player.changeStat( action.meterStatAffected);

      //start the animation
      if(action.postAnimation){
        console.log("started postAnimation: "+action.postAnimation.starting);
      }
      //start possible timers
      SceneTimer.startTimer(action.postTimerDef);

      if (action.postAnimation)
        selectedObject.gotoAndPlay(action.postAnimation.starting);

      //debugger;

      selectedObject = undefined;
      resetOptionsUI();

      //selected action
      var action = objDef.actionList[actionNum];


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
      resetOptionsUI();

      //start animation chain
      timeline.start();
    };

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

  return Scene ;
});