/**
 * Created by niko on 12/14/13.
 *
 *  scene 1 definitions
 *    list of scene:
 *      - background
 *      - Scene Animations
 *        - location + animationID
 *      - objects
 *        - with actions list
 *          - ObjectAction
 *    RickAction State Animations:
 *      - list of transitions and oa animations
 *        - see Classes Doc
 *
*     http://www.json.org/
 *
 */


define(["../animations", "scenes/scripts/scene1"],function(animations, script){
  var scene1 = function (){
    var scene = {};

    scene.name = "Bedroom";

    scene.startingIdle = {
      spritesheet: animations("ricka1s1"),
      starting: "sleep",
      location: {x:500, y:200}
    };

    //new createjs.Sprite(spritesheet,"afk");
    scene.background = {
      path: "assets/a1s1/background.png"
    };

    //Scene Animations
    //animations that are during the haunting phase
    scene.animations = {};
    scene.animations["turnoffAlarmClock"] = {
      spritesheet: animations("alarmclock"),
      starting: "reaction-broken",
      location: {x:100, y:100} // ??
    };
    scene.animations["setAlarmClockEarly"] = {
      spritesheet: animations("alarmclock"),
      starting: "reaction-activated",
      location: {x:100, y:100} // ??
    };


    //Scene Objects
    scene.objects = {};
    scene.objects["alarmclock"] = {
      tag: "alarmclock",
      name: "Alarm Clock",
      clickBounds: {x:900, y:320, w:60, h:60},//to click it
      idleAnimation: {
        spritesheet: animations("alarmclock"),
        starting: "idle",
        location: {x:720,y:200}
      },

      actionList: [
        { //action 1
          description: "break the alarm clock",
          meterStatAffected: {
            suspense: +1
          },
          postAnimation: scene.animations["turnoffAlarmClock"],  //from scene.animations, optional
          oaDef: {//new oa def {animation, wait, skip}
            type: "wait",
            wait: 5000, //ms
            rickDialog: script.alarm
          }
        },
        { //action 2
          description: "set the alarm clock early",
          meterStatAffected: {
            goodday: -1
          },
          postAnimation: scene.animations["setAlarmClockEarly"],  //from scene.animations, optional
          oaDef: {
            type: "animation",
            animation: {  //animation for during RickAction phase
              spritesheet: animations("alarmclock"),
              starting: "objectaction-interactl",
              location: {x:720,y:200}
            }
          }
        },
        {//action 3
          description: "do nothing",
          oaDef: {
            type: "animation",
            animation: {  //animation for during RickAction phase
              spritesheet: animations("alarmclock"),
              starting: "objectaction-interactl",
              location: {x:720,y:200}
            }
          }
        }
      ]
    };

    //RickAction Phase Animations
    scene.animationTimeline = [];

    scene.animationTimeline.push({
      type: "intro",
      name: "getup from bed",
      facing: "left",

      introAnim: {
        spritesheet: animations("ricka1s1"),
        starting: "wake",
        location: {x:500, y:200}
      }
    });

    scene.animationTimeline.push({
      type: "transition",
      //walking somewhere
      name: "walking from to alarmclock",

      facing: "right",
      length: 220, //timelength til rick stops and goes to his idle

      rickDialog: {
        script: script.introtalk,
        time: 50 // 50ms after this animation starts
      }
    });

    scene.animationTimeline.push({
      type: "oa", //objectaction animation
      tag: "alarmclock",//link to scene.objects

      //objectLink: scene.objects["alarmclock"],

      rickDialog: {
        script: script.alarm,
        time: 25 // 25ms after this animation starts
      }
    });




    return scene;
  }

  return scene1;
});