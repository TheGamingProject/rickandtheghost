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
 */


define(["../animations", "scenes/scripts/scene1"],function(animations, script){
  var scene1 = function (){
    var scene = {};

    scene.name = "Bedroom";


    //new createjs.Sprite(spritesheet,"afk");
    scene.background = {
      spritesheet: animations("menuBG"), //name of animation defined in animations
      starting: 0 //frame or animation name
    };

    //Scene Animations
    //animations that are during the haunting phase
    scene.animations = {};
    scene.animations["turnoffAlarmClock"] = {
      spritesheet: animations("alarmclock"),
      starting: "reaction-turnoff",
      location: {x:100, y:100}
    };
    scene.animations["setAlarmClockEarly"] = {
      spritesheet: animations("alarmclock"),
      starting: "reaction-setearly",
      location: {x:100, y:100}
    };


    //Scene Objects
    scene.objects = {};
    scene.objects["alarmclock"] = {
      name: "Alarm Clock",
      clickBounds: {x:180, y:180, w:90, h:90},//to click it
      idleAnimation: {
        spritesheet: animations("alarmclock"),
        starting: "idle",
        location: {x:200,y:200}
      },

      actionList: [
        { //action 1
          description: "turn off the alarm clock",
          meterStatAffected: {
            suspense: +1
          },
          postAnimation: scene.animations["turnoffAlarmClock"],  //from scene.animations, optional
          oaAnimation: {  //animation for during RickAction phase
            spritesheet: animations("alarmclock"),
            starting: "objectaction-turnoff",
            location: {x:150,y:150}
          }
        },
        { //action 2
          description: "set the alarm clock early",
          meterStatAffected: {
            goodday: -1
          },
          postAnimation: scene.animations["setAlarmClockEarly"],  //from scene.animations, optional
          oaAnimation: {  //animation for during RickAction phase
            spritesheet: animations("alarmclock"),
            starting: "objectaction-setearly",
            location: {x:150,y:150}
          }
        },
        {
          description: "do nothing",
          oaAnimation: {  //animation for during RickAction phase
            spritesheet: animations("alarmclock"),
            starting: "objectaction-abstain",
            location: {x:150,y:150}
          }
        }
      ]
    };

    //RickAction Phase Animations
    scene.animationTimeline = [];

    scene.animationTimeline.push({
      type: "transition",
      transtype: "intro", //this is a special animation
      name: "getup from bed",

      introAnim: {
        spritesheet: animations("rick_bedroom"),
        starting: "wake",
        location: {x:300, y:300}
      }
    });

    scene.animationTimeline.push({
      type: "oa", //objectaction animation
      name: "alarmclock",//link to scene.objects

      //objectLink: scene.objects["alarmclock"],

      rickDialog: {
        script: script.alarm,
        time: 25 // 25ms after this animation starts
      }
    });

    scene.animationTimeline.push({
      type: "transition",
      transtype: "walking", //walking off the side
      name: "getup from bed",

      facing: "right",
      length: 100, //timelength til rick stops and goes to his idle

      rickDialog: {
        script: script.introtalk,
        time: 50 // 50ms after this animation starts
      }
    });


    return scene;
  }

  return scene1;
});