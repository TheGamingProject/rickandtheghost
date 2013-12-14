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


define(["../animations", "scripts/scene1"],function(animations, script){
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
    scene.animations["didAlarmClock"] = {
      spritesheet: animations("alarmclockAnim"),
      starting: "play",
      location: {x:100, y:100}
    };

    //Scene Objects
    scene.objects = {};
    scene.objects["alarmclock"] = {
      location: {x:200,y:200},
      size: {width:50, height:50}, //to click it

      actionList: {
        action1: { //turn off alarm clock
          description: "turn off the alarm clock",
          meterStatAffected: {
            suspense: +1
          },
          postAnimation: "didAlarmClock",  //from scene.animations, optional
          oaAnimation: {  //animation for during RickAction phase
            spritesheet: animations("alarmclock_action1"),
            starting: "start",
            location: {x:150,y:150}
          }
        },
        action2: {

        }
      }
    };

    //RickAction Phase Animations
    scene.animationTimeline = [];

    scene.animationTimeline.push({
      type: "transition",
      transtype: "intro", //this is a special animation
      name: "getup from bed",

      introAnim: {
        spritesheet: animations(""),
        starting: "start",
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