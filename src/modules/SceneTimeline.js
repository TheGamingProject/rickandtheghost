/**
 * SceneTimeline.js
 *
 * Created by niko on 12/15/13.
 */


define(["Scene", "Utils", "animations"],function (Scene, Utils, animations){
  var STATES = {
    pre: 0,
    inIntro: 1,
    inTransition: 2,
    inObjAction: 3,
    over: 4
  };

  var WALKSPEED = 4; //20 pixel x per second?

  var SceneTimeline = function(rickSprite, sceneObjects, timelineDef){
    var that = {};

    // args should be an array starting with type:intro,
    //  then a series of transitions and objectaction animations
    var parseArgs = function(){

    };
    parseArgs();

    //private instance variables
    var state = STATES.pre;
    var timeblockCount = 0;

    var rickSprite;

    that.start = function(endCallback){
      state = STATES.inIntro;


      /*$.each(timelineDef, function(index, timeblock){
        doTimeBlock(timeblock);
      });

      doTimeBlock(timelineDef[1], function(){
        console.log("done timeblock 1");
      });*/

      //do x white (timeblockCount < timelineDef.length)
/*
      doTimeBlock(timelineDef[0], function(){
        console.log("done timeblock 0");
        doTimeBlock(timelineDef[1], function(){
          console.log("done timeblock 1");
          doTimeBlock(timelineDef[2], function(){
            console.log("done timeblock 2");
          });
        });
      });
*/
      var recursiveCallback = function(num){
        doTimeBlock(timelineDef[num], function(){
          timeblockCount++;
          if(timeblockCount < timelineDef.length)
            recursiveCallback(num+1);
        });
      }
      recursiveCallback(0);


      if(endCallback && typeof endCallback === "function")
        endCallback();

      state = STATES.over;
    }

    var doTimeBlock = function(timeblock, callback){//callback to start the next timeblock

      if(!timeblock)
        throw "null timeblock";
      /*
       {
       type: "intro",
       name: "getup from bed",

       introAnim: {
         spritesheet: animations("ricka1s1"),
         starting: "wake",
         location: {x:500, y:200}
         }
       }
      */
      var part1;
      switch(timeblock.type){
        case "intro":
          //always at the beginning of a timeline, is a unique traveling animation
          // -introAnim
          // fixed frames
          part1 = function(callbackFromMainloop){
            Utils.updateSprite(rickSprite,timeblock.introAnim, function(){


              var facing = "idler";
              //set to standing idle
              if(timeblock.facing && timeblock.facing === "left")
                facing = "idlel";

              Utils.updateSprite(rickSprite,{
                spritesheet: animations.get("rickglobal"),
                starting: facing//,
                //location: {x:500, y:200}
              },function(){
                console.log("after intro animation");
                callbackFromMainloop();
              });
            });
          };

          break;
        case "transition":
          //always walking in a direction,
          // changes x by some amount per second? (walk speed)
          // -facing
          // -distance
          part1 = function(callbackFromMainloop){
            var _startingWalk = "walkr",
              _startingIdle = "idler";
            var dir = 1;
            var i = 0;

            if(!timeblock.length)
              throw "invlaid timeblock length: "+timeblock.length;

            if(timeblock.facing && timeblock.facing === "left"){
              _startingWalk = "walkl";
              _startingIdle = "idlel";
              dir = -1;
            }
            var tempDef = {
              spritesheet: animations.get("rickglobal"),
              starting: _startingWalk
            };

            Utils.updateSprite(rickSprite,tempDef);

            var listener = createjs.Ticker.addEventListener("tick", function(){
              rickSprite.x += dir * WALKSPEED;
              i += WALKSPEED;


              if(i >= timeblock.length){
               /* console.log("after intro animation");
                callbackFromMainloop();*/

                Utils.updateSprite(rickSprite,{
                  spritesheet: animations.get("rickglobal"),
                  starting: _startingIdle
                },function(){
                  console.log("after intro animation");
                  callbackFromMainloop();
                });
                createjs.Ticker.removeEventListener("tick",listener);
              }

            });

            //end after walking a certain amount
            /*setTimeout(function(){
              console.log("after intro animation");
              callbackFromMainloop();
            }, timeblock.length * WALKSPEED);*/
          };



          break;
        case "oa":
          // -tag - identifies it to the ObjectAction
          // fixed amount of frames

          // we want to use ObjectAction(as animator) and make rick sprite not visible

          part1 = function(callbackFromMainloop){
            var objAction = sceneObjects[timeblock.tag].getChoiceAction();

            switch(objAction.oaDef.type){
              case "wait":
                setTimeout(function(){
                  console.log("done waiting");
                  callbackFromMainloop();
                },objAction.oaDef.wait)

                break;

              case "skip":
                break;

              case "animation":
                rickSprite.visible = false;
                Utils.updateSprite(sceneObjects[timeblock.tag], objAction.oaDef.animation, function(){
                  console.log("after oa animation");
                  rickSprite.visible = true;
                  callbackFromMainloop();
                });

                break;

              default:
                throw "invalid oaDef.type: " + objAction.oaDef.type;
            }



            //end 'part1()'
          };


          break;

        default:
          throw "invalid timeblock type";
      }
      //event listenr
      /*addEventListener("animationend", function(target, type, name, next){

      });*/

      //attachables:
      var part2;

      //rickDialog
      //etcAnimation
      if(timeblock.rickDialog && typeof rickDialog === "object"){
        $.each(timeblock.rickDialog, function(index, value){//value = def
          //start a timeout that displays stuff

        });
      }


      return function(cb){
        if(part1 && typeof part1 === "function")
          part1(cb);
        if(part2 && typeof part2 === "function")
          part2();

      }(function(){
        callback();
        uiUpdateCallback();
      });
    }

    that.getState = function(){
      return state;
    }

    that.getStateObj = function(){
      return {
        state: state,
        number: timeblockCount
      };
    }

    var uiCallback;
    var uiUpdateCallback = function(){
      if(uiCallback) uiCallback(that.getStateObj());
    };

    that.addUiCallback = function(callback){
      uiCallback = callback;
    }



    return that;
  }

  return SceneTimeline;
});