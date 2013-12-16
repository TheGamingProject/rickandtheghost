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
  var SceneTimer = function(args){
    var that = {};

    //private instance variables

    //public methods
    that.startTimer = function(timerDefs){
      if(!timerDefs) return;

      if(timerDefs.type){
        //just do this object
        startHelper(timerDefs);
      }
      $.each(timerDefs, function(index, value){
        if(value.type)
          startHelper(value);
      });

    }

    //big private code
    var startHelper = function(timerDef){
      if(!timerDef || !timerDef.type)
        throw "not valid timerDef: "+timerDef;
      setTimeout(function(){
        switch(timerDef.type){
          case "animation":
            break;

          case "rickdialog":
            break;

          case "fade":
            break;
        }
        console.log("added "+timerDef.type+" to TimerQueue");
      },5);
    };

    return that;
  };


  return SceneTimer;
});