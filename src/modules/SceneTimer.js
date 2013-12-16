/**
 * SceneTimer.js
 *
 * Created by niko on 12/16/13.
 *
 *
 * timerDef: [
               {
                 type: "rickdialog",
                 location: {x: 200, y:200},
                 offset: 10  //timer
               }
             ]
 */



define([],function (){
  var DEFAULT_DIALOG_LENGTH = 1500;

  var SceneTimer = function(args){
    var that = {};

    //private instance variables
    var dialogContainer

    //public methods
    that.setUIContainerForDialog = function(_container){
      dialogContainer = _container;
    }

    that.startTimer = function( timerDefs){
      if(!timerDefs) return;

      if(timerDefs.type){
        //just do this object
        startHelper( timerDefs);
      }
      $.each(timerDefs, function(index, value){
        if(value.type)
          startHelper( value);
      });

    }

    //big private code
    var startHelper = function(timerDef){
      if(!timerDef || !timerDef.type)
        throw "not valid timerDef: "+timerDef;

      //-offset (ms)
      setTimeout(function(){
        switch(timerDef.type){
          case "animation":
            break;

          case "rickdialog":
            //-location {x,y}
            //-script (string)
            //-displayLength (ms)

            var location = timerDef.location;
            if(!location || typeof location.x !== "number" || typeof location.x !== "number")
              throw "invalid location for timerDef: "+timerDef;

            var displayLength = timerDef.displayLength || DEFAULT_DIALOG_LENGTH;
            var script = timerDef.script || "missing script";

            //create label
            var dialogText = new createjs.Text(script, "20px Arial", "#ff7700");
            dialogText.x = location.x;
            dialogText.y = location.y;
            dialogText.textBaseline = "alphabetic";
            dialogContainer.addChild(dialogText);
            debugger;

            //timeout to kill a textlabel

            break;

          case "fade":
            break;
        }
        console.log("Timer fired "+timerDef.type);
      },timerDef.offset);
      console.log("added "+timerDef.type+" to TimerQueue");
    };

    return that;
  };


  return  SceneTimer();
});