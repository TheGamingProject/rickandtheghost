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
  var DEFAULT_DIALOG_LENGTH = 2000;

  var SceneTimer = function(args){
    var that = {};

    //private instance variables
    var dialogContainer
    var exitCallback

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
    that.setExitSceneCallback = function(_callback){
      exitCallback = _callback;
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

            //timeout to kill a textlabel
            setTimeout(function(){
              dialogContainer.removeChild((dialogText));
              delete dialogText;
            },displayLength);


            break;

          case "fade":
            //-color
            //-opaque (in vs out)
            //-displayLength (ms)
            //-exit (ends scene if true)
            var refreshTime = 5;
            var color = timerDef.color || {r: 0, g: 0, b: 0};
            var displayLength = timerDef.displayLength || 5000;
            var exit = timerDef.exit;

            var startingOpaque = 0, //defaults to out
              endingOpaque = 1;

            if(timerDef.opaque === "in"){
              startingOpaque = 1;
              endingOpaque = 0;
            }
            var totalChange = startingOpaque - endingOpaque;

            //var rect = new createjs.Shape();
            //rect.graphics.beginFill(createjs.Graphics.getRGB(color.r,color.g,color.b,startingOpaque)).drawRect(0,0,GAME.SIZE.x,GAME.SIZE.y);
            //dialogContainer.addChild(rect);

            var fadeFunc = function(opaqueness,rect){
              setTimeout(function(o, r){
                if(Math.abs(startingOpaque - o ) > Math.abs(totalChange)){
                  //end fade
                  dialogContainer.removeChild(r);
                  if(exit){
                    if(exitCallback)
                      exitCallback();
                  }

                  return;
                }

                //change opacity
                if(r){
                  dialogContainer.removeChild(r);
                  delete r;
                }

                var r = new createjs.Shape();
                r.graphics.beginFill(createjs.Graphics.getRGB(color.r,color.g,color.b,o)).drawRect(0,0,GAME.SIZE.x,GAME.SIZE.y);
                var delta = (refreshTime/displayLength) * totalChange * 5;
                //console.log("fade o: "+o + " c: "+delta+" silly: "+dialogContainer.children.length);
                dialogContainer.addChild(r);

                fadeFunc(o - delta,r);
              },refreshTime,opaqueness,rect);
            };

            fadeFunc(startingOpaque);

            break;
        }
        console.log("Timer fired "+timerDef.type);
      },timerDef.offset || 0);
      console.log("added "+timerDef.type+" to TimerQueue");
    };

    return that;
  };


  return  SceneTimer();
});