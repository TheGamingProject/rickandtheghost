/**
 * SceneOptionsUI.js
 *
 * Created by niko on 12/21/13.
 */
define(["Scene/SceneTimer"], function (SceneTimer) {
  var OPTIONS_AMOUNT = 3; //hardcoded to 3 right now

  //var UI_START = {x: , y: }; TODO un hardcode below #monkeyscenes

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

  var SceneOptionsUI = function(args){
    var that = new createjs.Container(); //extends container

    ///////// private instance variables    ///////////////
  //  var parentContainer;
    var selectedObject;
    var objectActionTitleText;
    var uiOptionsText = [];

    // validate args
    args = args || {};
  /*)  if(!args.parentContainer)
      throw "invalid parent container";
    parentContainer = args.parentContainer;
*/
    ////////// private functions  //////////////
    var init = function(){
  //    parentContainer.addChild();

      //make the buttons and add them to 'that' container

      //debug text
      objectActionTitleText = new createjs.Text("UI_OPTION_TITLE", "20px Arial", "#ff7700");
      objectActionTitleText.x = UI_OPTION_TITLE.x;
      objectActionTitleText.y = UI_OPTION_TITLE.y;
      objectActionTitleText.textBaseline = "alphabetic";
      that.addChild(objectActionTitleText);

      var helper = function (i){
        return function(e){
          //mid tricky
  //        sceneContainer.hit = true;
  //        tricky2 = true;
          //console.log("hit");

          if(selectedObject)
            selectObjectAction(i);
        };
      };

      for(var i=0; i<3; i++){
        var b = UI_OPTION_BUTTONS[i];

        var buttonRect = new createjs.Shape();
        buttonRect.graphics.beginFill("black").drawRect(b.x,b.y,b.w,b.h);

        buttonRect.addEventListener("click", helper(i));

        uiOptionsText[i] = new createjs.Text("option "+i, "24px RBNo2", "#ffffff");
        uiOptionsText[i].x = b.x + 5;
        uiOptionsText[i].y = b.y + 25;
        uiOptionsText[i].textBaseline = "alphabetic";

        that.addChild(buttonRect);
        that.addChild(uiOptionsText[i]);
      }


    };

    //change choice & play animation
    var doButtonPressed = function(choice){



    };

    var resetOptionsUI = function(){
      console.log("ui reset");

      objectActionTitleText.text = "UI_OPTION_TITLE";
      selectedObject = undefined;

      for(var t in uiOptionsText){     //TODO make $.each
        uiOptionsText[t].text = "option _ :)";
      }
    }

    var selectObjectAction = function(actionNum){
      if (!selectedObject)
        throw "invalid Object String";
      var objDef = selectedObject.getObjDef();

      console.log("Selected Object:" + objDef.name +": action-"+actionNum);

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

      //debugger;

      selectedObject = undefined;
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

      /*if(!sceneObject)*/ resetOptionsUI();

      var objDef = sceneObject.getObjDef();
      objectActionTitleText.text = objDef.name;
      selectedObject = sceneObject;

      $.each(objDef.actionList, function(index, action){
        console.log(index+ ": "+action.description);
        uiOptionsText[index].text =  " "+action.description;
      });
    };

    init();

    return that;
  };

  return SceneOptionsUI;
});