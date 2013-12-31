/**
 * SceneTimer.js
 *
 * Created by niko on 12/16/13.
 *
 * timerDef: [
               {
                 type: "rickdialog",
                 location: {x: 200, y:200},
                 offset: 10  //timer
               }
             ]
 */



define(["../Utils"],function (Utils){
  var DEFAULT_DIALOG_LENGTH = 2000;

  var DIALOG_BOX_ALPHA = .6;
  var DIALOG_BOX_HEIGHT = 40;
  var DIALOG_TEXT_OFFSET = {x: 5, y: 29};

  var SceneTimer = function(args){
    var that = {};

    //private instance variables
    var aFader; // from someone else?
    var objectContainer;
    var dialogContainer;
    var exitCallback;


    //public methods
    that.setUIContainerForDialog = function(_container){
      dialogContainer = _container;
    }
    that.setObjectContainer = function(_container){
      objectContainer = _container;
    }
    that.setFaderObject = function(_fadeObj){
      aFader = _fadeObj;
    }

    that.setStartFadeColor = function(color){
      aFader.setImmediateFade({color: color});
    };

    that.startTimer = function( timerDefs){
      if(!timerDefs) return;

      if(timerDefs.type){
        //just do this object
        startHelper( timerDefs);
        return;
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
            //-ourAnimSpec
            //-existing sprite -(including sceneObject) optional

            var animSpec = timerDef.animSpec;
            if(!animSpec)
              throw "undefined animSpec";

            var sprite = timerDef.sprite;

            if(sprite)
              Utils.updateSprite(sprite, animSpec);
            else{
              var s = Utils.makeSprite(animSpec);
              objectContainer.addChildAt(s,0);
            }

            break;

          case "rickdialog":
            //-location {x,y}
            //-script (string)
            //-displayLength (ms)

            var location = timerDef.location;
            if(!location || typeof location.x !== "number" || typeof location.x !== "number")
              throw "invalid location for timerDef: "+timerDef;

            var displayLength = timerDef.displayLength || DEFAULT_DIALOG_LENGTH;

            var script;
            if(typeof timerDef.script === "string")
              script = timerDef.script;
            else
              script = "missing script";


            //create text
            var dialogText = Utils.createTextByStoryDef({text: script, fontDef: "rickDialog" }) ;
            dialogText.x = location.x + DIALOG_TEXT_OFFSET.x;
            dialogText.y = location.y + DIALOG_TEXT_OFFSET.y;
            dialogText.textBaseline = "alphabetic";

            //create blackbox behind text
            var dialogRect = new createjs.Shape();
            dialogRect.mouseEnabled = false;
            dialogRect.graphics.beginFill(createjs.Graphics.getRGB(0,0,0,DIALOG_BOX_ALPHA)).drawRect(location.x, location.y, dialogText.getMeasuredWidth() + DIALOG_TEXT_OFFSET.x * 2, DIALOG_BOX_HEIGHT, .5);

            dialogContainer.addChild(dialogRect);
            dialogContainer.addChild(dialogText);

            //timeout to kill a textlabel
            setTimeout(function(){
              dialogContainer.removeChild(dialogText);
              dialogContainer.removeChild(dialogRect);

              dialogText = null;
              dialogRect = null;
            },displayLength);


            break;

          case "fade":
            //-color
            //-opaque (in vs out)
            //-displayLength (ms)
            //-exit (ends scene if true)

            var color = timerDef.color;
            var displayLength = timerDef.displayLength || 5000;
            var exit = timerDef.exit;

            var startingOpaque = 0, //defaults to out
              endingOpaque = 1;

            if(typeof timerDef.opaque === "object" && typeof timerDef.opaque.start === "number" && typeof timerDef.opaque.stop === "number"){
              if(timerDef.opaque.start)
                startingOpaque = timerDef.opaque.start;
              else
                timerDef.opaque.start = prevOpaque;

              endingOpaque = timerDef.opaque.stop;
            }else if(timerDef.opaque === "in"){
              startingOpaque = 1;
              endingOpaque = 0;
            }

            aFader.startFader({
              "color": color,
              "startingOpaque": startingOpaque,
              "endingOpaque": endingOpaque,
              "displayLength": displayLength,
              "endFadeCallback": (exit ? exitCallback : undefined)
            });

            break;
        }
        console.log("Timer fired "+timerDef.type+" desc: "+timerDef.desc);
      },timerDef.offset || 0);
      console.log("added "+timerDef.type+" to TimerQueue");
    };

    return that;
  };


  return  SceneTimer();
});