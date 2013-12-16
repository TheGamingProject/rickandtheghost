/**
 * Created by niko on 12/14/13.
 *
 *  scene 2 definitions
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


define(["../animations", "scenes/scripts/script2"],function(animations, script){
  var scene1 = function (){
    var scene = {};

    scene.name = "Kitchen";

    scene.startFade = {r: 0, g: 0, b: 0, o: 0.5};

    scene.startingIdle = {
      spritesheet: animations.get("rickglobal"),
      starting: "sitl",
      location: {x:900, y:175}
    };

    scene.background = {
      path: "assets/a1s2/background.png"
    };

    //Scene Animations
    //animations that are during the haunting phase
    //  or arent associated with timeblocks

    scene.animations = {};
    //oatmeal (scene object animations don't need new locations)
    scene.animations["makeOatmealHot"] = {
      spritesheet: animations.get("oatmeal"),
      starting: "reaction-heat"
    };
    scene.animations["makeOatmealCold"] = {
      spritesheet: animations.get("oatmeal"),
      starting: "reaction-cool"
    };
    //calendar
    scene.animations["swapCalendar"] = {
      spritesheet: animations.get("calendar"),
      starting: "reaction-swap"
    };
    scene.animations["markCalendar"] = {
      spritesheet: animations.get("calendar"),
      starting: "reaction-mark"
    };
    //fridge
    scene.animations["eggTheFridge"] = {
      spritesheet: animations.get("fridge"),
      starting: "reaction-eggs"
    };



    //Scene Objects (oatmeal, calender, fridge)
    scene.objects = {};

    //////////// OATMEAL /////////////
    scene.objects["oatmeal"] = {
      tag: "oatmeal",
      name: "Oatmeal",
      clickBounds: {x:950, y:320, w:50, h:50},//to click it
      idleAnimation: {
        spritesheet: animations.get("oatmeal"),
        starting: "idle",
        location: {x:910,y:168}
      },

      actionList: [
        { //action 1
          description: script["Oatmeal Hot"],
          meterStatAffected: {
            goodday: -4
          },
          postAnimation: scene.animations["makeOatmealHot"],  //from scene.animations, optional
          oaDef: {//action def
            type: "wait",
            wait: 1000, //ms
            timerDef: [
              {
                type: "rickdialog",
                location: {x: 600, y:200},
                offset: 100,  //timer
                script: script["oatmeal-option1"],
                displayLength: 3000
              }
            ]
          }
        },
        { //action 2
          description: script["Oatmeal Cold"],
          meterStatAffected: {
            goodday: -8,
            suspense: +3
          },
          postAnimation: scene.animations["makeOatmealCold"],  //from scene.animations, optional
          oaDef: {//action def
            type: "wait",
            wait: 1000, //ms
            timerDef: [
              {
                type: "rickdialog",
                location: {x: 600, y:200},
                offset: 100,  //timer
                script: script["oatmeal-option2"],
                displayLength: 3000
              }
            ]
          }
        },
        {//action 3
          description: script["Oatmeal Null"],
          oaDef: {//action def
            type: "wait",
            wait: 1000, //ms
            timerDef: [
              {
                type: "rickdialog",
                location: {x: 600, y:200},
                offset: 100,  //timer
                script: script["oatmeal-option3"],
                displayLength: 3000
              }
            ]
          }
        }
      ]
    };
    //////////// Calendar /////////////
    scene.objects["calendar"] = {
      tag: "calendar",
      name: "Calendar",
      clickBounds: {x:660, y:200, w:80, h:150},//to click it
      idleAnimation: {
        spritesheet: animations.get("calendar"),
        starting: "idle",
        location: {x:660,y:201}
      },

      actionList: [
        { //action 1
          description: script["Calendar Mom"],
          meterStatAffected: {
            goodday: -5,
            suspense: +7
          },
          postAnimation: scene.animations["markCalendar"],  //from scene.animations, optional
          postTimerDef: {
            type: "fade",
            desc: "haunting turn lights on, instant",
            offset: 1,
            opaque: {
              start:.5,
              stop:0
            },
            displayLength: 10
          },
          oaDef: {
            type: "wait",
            wait: 1000,
            timerDef: {
              type: "rickdialog",
              location: {x: 500, y:200},
              offset: 100,  //timer
              script: script["calendar-option1"],
              displayLength: 2000
            }
          }
        },
        { //action 2
          description: script["Calendar Switch"],
          meterStatAffected: {
            goodday: -5,
            suspense: +7,
            scared: +5
          },
          postAnimation: scene.animations["swapCalendar"],  //from scene.animations, optional

          oaDef: {
            type: "wait",
            wait: 1000,
            timerDef: {
              type: "rickdialog",
              location: {x: 500, y:200},
              offset: 100,  //timer
              script: script["calendar-option2"],
              displayLength: 2000
            }
          }
        },
        {//action 3
          description: script["Calendar Null"],


          oaDef: {
            type: "wait",
            wait: 1000,
            timerDef: {
              type: "rickdialog",
              location: {x: 500, y:200},
              offset: 100,  //timer
              script: script["calendar-option3"],
              displayLength: 2000
            }
          }
        }

      ]
    };
    //////////// FRIDGE /////////////
    scene.objects["fridge"] = {
      tag: "fridge",
      name: "Fridge",
      clickBounds: {x:120, y:200, w:150, h:300},//to click it
      idleAnimation: {
        spritesheet: animations.get("fridge"),
        starting: "idle",
        location: {x:72,y:205}
      },

      actionList: [
        { //action 1
          description: script["Fridge Set"],
          meterStatAffected: {
            goodday: -2,
            suspense: +3,
            scared: +2
          },
          //postAnimation: scene.animations["markPoster"],  //from scene.animations, optional
          oaDef: {
            type: "animation",
            wait: 5000, //ms
            timerDef: {
              type: "rickdialog",
              location: {x: 600, y:300},
              offset: 100,  //timer
              script: script["fridge-option1"],
              displayLength: 3000
            }
          }
        },
        { //action 2
          description: script["Fridge Eggs"],
          meterStatAffected: {
            goodday: +2,
            suspense: +2
          },//reaction-eggs
          postAnimation: scene.animations["eggTheFridge"],  //from scene.animations, optional
          oaDef: {
            type: "wait",
            wait: 5000, //ms
            timerDef: {
              type: "rickdialog",
              location: {x: 400, y:300},
              offset: 100,  //timer
              script: script["fridge-option2"],
              displayLength: 3000
            }
          }
        },
        {//action 3
          description: script["Fridge Null"],
          oaDef: {
            type: "wait",
            wait: 1000, //ms
            timerDef: {
              type: "rickdialog",
              location: {x: 500, y:200},
              offset: 100,  //timer
              script: script["fridge-option3"],
              displayLength: 2000
            }
          }
        }
      ]
    };

    //RickAction Phase Animations
    scene.animationTimeline = [];

    ///////////TIME BLOCKS/////////////
    scene.startSceneTimerDef = {
      type: "fade",
      desc: "pre-haunting fade",
      offset: 0,
      opaque: {
        start:.5,
        stop:0
      },
      displayLength: 500
    };

/*
    scene.animationTimeline.push({
      type: "intro",
      name: "getup from bed",
      facing: "left",

      introAnim: {
        spritesheet: animations.get("rickglobal"),
        starting: "sitl",
        location: {x:500, y:200}
      }
    });
*/

    scene.animationTimeline.push({
      type: "oa", //objectaction animation
      tag: "oatmeal"//link to scene.objects


    });

    scene.animationTimeline.push({
      type: "transition",
      //walking somewhere
      name: "walking from  alarmclock to switch",

      facing: "left",
      translate: {y: 25},
      length: 300 //timelength til rick stops and goes to his idle


    });

    scene.animationTimeline.push({
      type: "oa", //objectaction animation
      tag: "calendar" //link to scene.objects
    });

    scene.animationTimeline.push({
      type: "transition",
      //walking somewhere
      name: "walking from the calendar to the fridege",

      facing: "left",
      length: 500 //timelength til rick stops and goes to his idle

    });

    scene.animationTimeline.push({
      type: "oa", //objectaction animation
      tag: "fridge",

      timerDef: {
        type: "fade",
        desc: "end fade",
        offset: 10000,
        opaque: {stop: 0},
        exit: true,
        displayLength: 1000
      }
    });

    return scene;
  }

  return scene1;
});