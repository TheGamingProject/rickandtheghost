/**
 * Fader.js
 *  - currently half abstracted
 *
 * Created by niko on 12/19/13.
 */


define(function(){
  var DEFAULT_FADE_RECT = {x: 0, y: 0, w: GAME.SIZE.x, h: 500};//TODO abstract this
  var DEFAULT_FADE_COLOR = {r: 0, g: 0, b: 0};




  var Fader = function(args){
    var that = new createjs.Container();//is this the right way to extend?


    var fadeRect;
    var startFadeRect;

    var prevOpaque; //or current Opaqueness..
    
    that.setImmediateFade = function (argz){

      if(argz.color){
        var color = argz.color;
        //TODO validate fade color

        startFadeRect = new createjs.Shape();
        var r = DEFAULT_FADE_RECT;
        startFadeRect.graphics.beginFill(createjs.Graphics.getRGB(color.r,color.g,color.b,color.o)).drawRect(r.x, r.y, r.w, r.h);
        startFadeRect.mouseEnabled = false;
        prevOpaque = color.o;
        that.addChild(startFadeRect);
      }

      //TODO OPACITY
    };

    that.startFader = function (argz){
      //make sure these parameters are the shit!!! (or not the shit)
      var startingOpaque = argz.startingOpaque;
      var endingOpaque = argz.endingOpaque;
      var color = argz.color || DEFAULT_FADE_COLOR;
      var displayLength = argz.displayLength || 5000;
      var endFadeCallback = argz.endFadeCallback;
      var refreshTime = argz.refreshTime || 5;

      //TODO ???

      /////////////////

      var totalChange = startingOpaque - endingOpaque;

      that.removeChild(startFadeRect);

      var fadeFunc = function(opaqueness,rect){
        setTimeout(function(o, r){
          if(Math.abs(startingOpaque - o ) > Math.abs(totalChange)){
            //end fade
            //dialogContainer.removeChild(r);
            startFadeRect = r;
            prevOpaque = o;

            if(endFadeCallback)
              endFadeCallback();

            return;
          }

          //change opacity
          if(r){
            that.removeChild(r);
            delete r;
          }

          var r = new createjs.Shape();
          r.graphics.beginFill(createjs.Graphics.getRGB(color.r,color.g,color.b,o)).drawRect(DEFAULT_FADE_RECT.x, DEFAULT_FADE_RECT.y, DEFAULT_FADE_RECT.w, DEFAULT_FADE_RECT.h);
          r.mouseEnabled = false;
          var delta = (refreshTime/displayLength) * totalChange // * 5;totalChange * 5;

          // Advanced debug:
          // console.log("fade o: "+o + " c: "+delta+" silly: "+dialogContainer.children.length);

          that.addChild(r);

          fadeFunc(o - delta,r);
        },refreshTime,opaqueness,rect);
      };

      fadeFunc(startingOpaque);
    }



    return that;
  };

  return Fader;
});
