/**
 * SceneOptionsUI.js
 *
 * Created by niko on 12/21/13.
 */
define(["Scene/SceneTimer", "storys/RatG/assets", "Utils", "SoundManager"], function (SceneTimer, ourAssets, Utils, SoundManager) {
  var OPTIONS_AMOUNT = 3; //hardcoded to 3 right now

  //var UI_START = {x: , y: }; TODO un hardcode below #monkeyscenes

  var UI_OPTION_TITLE = { // alarm clock
    x: 600, y: 525
  };

  var UI_OPTION_BUTTONS = {
    coords: [
      {
        x: 775, y: 540, w: 400, h: 50
      },{
        x: 775, y: 595, w: 400, h: 50
      },{
        x: 775, y: 650, w: 400, h: 50
      }],
    color: "#1a1a1a"
  };

  var UI_OPTION_DASH_PATH = "assets/ui/option-dash.png";

  var UI_OPTION_DASH_OFFSET = {x: 2, y: 17};
  var UI_OPTION_TEXT_OFFSET = {x: 18, y: 30};

  var SceneOptionsUI = function(args){
    var that = new createjs.Container(); //extends container

    ///////// private instance variables    ///////////////
  //  var parentContainer;
    var selectedObject;
    var objectActionTitleText;

    var uiOptionsBlackBox = []; //this isnt the best way...
    var uiOptionsText = [];
    var uiOptionsDash = [];

    // validate args
    args = args || {};

    ////////// private functions  //////////////
    var init = function(){

      //make the buttons and add them to 'that' container

      //debug text
      if(DEBUG.sceneState){
        objectActionTitleText = new createjs.Text("UI_OPTION_TITLE", "25px "+ourAssets.font, "#ff7700");
        objectActionTitleText.x = UI_OPTION_TITLE.x;
        objectActionTitleText.y = UI_OPTION_TITLE.y;
        objectActionTitleText.textBaseline = "alphabetic";
        that.addChild(objectActionTitleText);
      }


      //set up click bounds and other dash-image
      for(var i=0; i<3; i++){
        var b = UI_OPTION_BUTTONS.coords[i];
        uiOptionsBlackBox[i] = new createjs.Shape();
        uiOptionsBlackBox[i].graphics.beginFill(UI_OPTION_BUTTONS.color).drawRect(b.x,b.y,b.w,b.h);

        uiOptionsBlackBox[i].addEventListener("click", doButtonPressed(i));

        uiOptionsText[i] = Utils.createTextByStoryDef({ text: "option "+i, fontDef: "hauntObjectOptions"});
        uiOptionsText[i].x = b.x + UI_OPTION_TEXT_OFFSET.x;
        uiOptionsText[i].y = b.y + UI_OPTION_TEXT_OFFSET.y;
        uiOptionsText[i].textBaseline = "alphabetic";

        uiOptionsDash[i] = new createjs.Bitmap(UI_OPTION_DASH_PATH);
        uiOptionsDash[i].x = b.x + UI_OPTION_DASH_OFFSET.x;
        uiOptionsDash[i].y = b.y + UI_OPTION_DASH_OFFSET.y;
        uiOptionsDash[i].textBaseline = "alphabetic";



        that.addChild(uiOptionsBlackBox[i]);
        that.addChild(uiOptionsText[i]);
        that.addChild(uiOptionsDash[i]);
      }

      resetOptionsUI();
    };

    //change choice & play animation
    var doButtonPressed = function(choice){
      return function(){
        if(selectedObject)
          selectObjectAction(choice);
      };
    };

    var resetOptionsUI = function(){
      console.log("ui reset");

      if(objectActionTitleText) objectActionTitleText.text = "";//"UI_OPTION_TITLE";
      selectedObject = undefined;

      $.each(uiOptionsText, function(key, value){
        value.text = "";//"option _ :)";
      });

      $.each(uiOptionsDash, function(key, value){
        value.visible = false;
      });

      $.each(uiOptionsBlackBox, function(key, value){
        value.visible = false;
      });
    }

    var selectObjectAction = function(actionNum){
      if (!selectedObject)
        throw "invalid Object String";
      var objDef = selectedObject.getObjDef();

      console.log("Selected Object:" + objDef.name +": action-"+actionNum);

      SoundManager.playSoundEffect("hauntOptionsClick");

      if(actionNum != 2)
        selectedObject.setChoice(actionNum);

      //selected action
      var action = objDef.actionList[actionNum];

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

      selectedObject = null;
      resetOptionsUI();

    };


    ///////// public functions ////////////////////

    //  clears the ui
    that.clearSelectedObject = function(){
      console.log("SceneOptionsUI: cleared SelecteD objectt");

      resetOptionsUI();
    };

    //  should be called when an object is clicked
    that.setSelectedObject = function(sceneObject){
      if (!sceneObject)
        throw "invalid sceneObject!";

      console.log("SceneOptionsUI: setObject: " + sceneObject.getObjDef().name);

      resetOptionsUI();

      var objDef = sceneObject.getObjDef();
      if (objectActionTitleText) objectActionTitleText.text = objDef.name;
      selectedObject = sceneObject;

      $.each(objDef.actionList, function(index, action){
        console.log(index+ ": "+action.description);
        uiOptionsText[index].text =  " "+action.description;
        uiOptionsBlackBox[index].visible = true;
      });
      $.each(uiOptionsDash, function(key, value){
        value.visible = true;
      });
    };

    init();

    return that;
  };

  return SceneOptionsUI;
});