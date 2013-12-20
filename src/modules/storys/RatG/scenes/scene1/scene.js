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

this;
//debugger;                ../
define(["Loader", "storys/RatG/scenes/scene1/script"],function(Loader, script){
  var scene1 = function (){
    var scene = {};

    scene.name = "Bedroom";

    scene.startFade = {r: 0, g: 0, b: 0, o: .5};

    scene.startingIdle = {
      spritesheet: Loader.get("ricka1s1"),
      starting: "sleep",
      location: {x:500, y:200}
    };

    //new createjs.Sprite(spritesheet,"afk");
    scene.background = {
      path: Loader.getStill("assets/scenes/a1s1/background.png")
    };

    //Scene Animations
    //animations that are during the haunting phase
    scene.animations = {};
    scene.animations["turnoffAlarmClock"] = {
      spritesheet: Loader.get("alarmclock"),
      starting: "reaction-broken",
      location: {x:100, y:100} // ??
    };
    scene.animations["setAlarmClockEarly"] = {
      spritesheet: Loader.get("alarmclock"),
      starting: "reaction-activated",
      location: {x:100, y:100} // ??
    };

    //light switch
    scene.animations["turnLightsOn"] = {
      spritesheet: Loader.get("switch"),
      starting: "idleon",
      location: {x:100, y:100} // ??
    };
    scene.animations["breakLightSwitch"] = {
      spritesheet: Loader.get("switch"),
      starting: "reaction-break",
      location: {x:100, y:100} // ??
    };
    //poster
    scene.animations["unfoldPoster"] = {
      spritesheet: Loader.get("poster"),
      starting: "reaction-unfold",
      location: {x:100, y:100} // ??
    };
    scene.animations["markPoster"] = {
      spritesheet: Loader.get("poster"),
      starting: "reaction-mark",
      location: {x:100, y:100} // ??
    };

    //window rays
    scene.animations["idleWindowRays"] = {
      spritesheet: Loader.get("windowrays"),
      starting: "idle",
      location: {x:440,y:50}
    };


    //Scene Objects
    scene.objects = {};

    //////////// ALARMCLOCK /////////////
    scene.objects["alarmclock"] = {
      tag: "alarmclock",
      name: "Alarm Clock",
      clickBounds: {x:900, y:310, w:60, h:60},//to click it
      idleAnimation: {
        spritesheet: Loader.get("alarmclock"),
        starting: "idle",
        location: {x:720,y:200}
      },

      actionList: [
        { //action 1
          description: script["alarm-button1"],
          meterStatAffected: {
            goodday: -4
          },
          postAnimation: scene.animations["turnoffAlarmClock"],  //from scene.animations, optional
          oaDef: {//action def
            type: "wait",
            wait: 1000, //ms
            timerDef: [
              {
                type: "rickdialog",
                location: {x: 240, y:200},
                offset: 100,  //timer
                script: script["alarm-option1"],
                displayLength: 3000
              }
            ]
          }
        },
        { //action 2
          description: script["alarm-button2"],
          meterStatAffected: {
            goodday: -8,
            suspense: +3
          },
          postAnimation: scene.animations["setAlarmClockEarly"],  //from scene.animations, optional
          oaDef: {
            type: "animation",
            animation: {  //animation for during RickAction phase
              spritesheet: Loader.get("alarmclock"),
              starting: "objectaction-interactl",
              location: {x:720,y:200}
            },
            timerDef: {
              type: "rickdialog",
              location: {x: 280, y:200},
              offset: 100,
              script: script["alarm-option2"],
              displayLength: 2500
            }
          }
        },
        {//action 3
          description: script["alarm-button3"],
          oaDef: {
            type: "animation",
            animation: {  //animation for during RickAction phase
              spritesheet: Loader.get("alarmclock"),
              starting: "objectaction-interactl",
              location: {x:720,y:200}
            },
            timerDef: {
              type: "rickdialog",
              location: {x: 200, y:200},
              offset: 100,
              script: script["alarm-option3"],
              displayLength: 2000
            }
          }
        }
      ]
    };
    //////////// SWITCH /////////////
    scene.objects["switch"] = {
      tag: "switch",
      name: "Switch",
      clickBounds: {x:1210, y:290, w:40, h:60},//to click it
      idleAnimation: {
        spritesheet: Loader.get("switch"),
        starting: "idleoff",
        location: {x:1010,y:201}
      },

      actionList: [
        { //action 1
          description: script["light-button1"],
          meterStatAffected: {
            goodday: -5,
            suspense: +7
          },
          postAnimation: scene.animations["turnLightsOn"],  //from scene.animations, optional
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
          oaDef: {//new oa def {animation, wait, skip}
            type: "wait",
            wait: 2000, //ms
            timerDef: {
              type: "rickdialog",
              location: {x: 910, y:200},
              offset: 100,  //timer
              script: script["switch-option1"],
              displayLength: 3000
            }
          }//TODO queue lights on animation   ???????????
        },
        { //action 2
          description: script["light-button2"],
          meterStatAffected: {
            goodday: -5,
            suspense: +7,
            scared: +5
          },
          postAnimation: scene.animations["breakLightSwitch"],  //from scene.animations, optional

          oaDef: {
            type: "animation",
            timerDef: {
              type: "rickdialog",
              location: {x: 800, y:200},
              offset: 100,  //timer
              script: script["switch-option2"],
              displayLength: 3000
            },
            animation: {  //animation for during RickAction phase
              spritesheet: Loader.get("switch"),
              starting: "objectaction-turnonbroken",
              location: {x:1010,y:200}
            }
          }
        },
        {//action 3
          description: script["light-button3"],


          oaDef: {
            type: "animation",
            timerDef: [
              {
                type: "fade",
                desc: "fading to light when we hit the light switch",
                offset: 1,
                opaque: {
                  start:.5,
                  stop:0
                },
                displayLength: 10
            }],
            animation: {  //animation for during RickAction phase
              spritesheet: Loader.get("switch"),
              starting: "objectaction-turnon",
              location: {x:1010,y:200}
            }
          }
        }

      ]
    };
    //////////// POSTER /////////////
    scene.objects["poster"] = {
      tag: "poster",
      name: "Poster",
      clickBounds: {x:120, y:45, w:120, h:260},//to click it
      idleAnimation: {
        spritesheet: Loader.get("poster"),
        starting: "idlefold",
        location: {x:122,y:45}
      },

      actionList: [
        { //action 1
          description: script["poster-button1"],
          meterStatAffected: {
            goodday: -2,
            suspense: +3,
            scared: +2
          },
          postAnimation: scene.animations["markPoster"],  //from scene.animations, optional
          oaDef: {
            type: "wait",
            wait: 5000, //ms
            timerDef: {
              type: "rickdialog",
              location: {x: 265, y:190},
              offset: 100,  //timer
              script: script["poster-option1"],
              displayLength: 3000
            }
          }
        },
        { //action 2
          description: script["poster-button2"],
          meterStatAffected: {
            goodday: +2,
            suspense: +2
          },
          postAnimation: scene.animations["unfoldPoster"],  //from scene.animations, optional
          oaDef: {
            type: "wait",
            wait: 5000, //ms
            timerDef: {
              type: "rickdialog",
              location: {x: 400, y:280},
              offset: 100,  //timer
              script: script["poster-option2"],
              displayLength: 3000
            }
          }
        },
        {//action 3
          description: script["poster-button3"],
          oaDef: {
            type: "wait",
            wait: 1000 //ms
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
        start: 1,
        stop:.5
      },
      displayLength: 500
    };


    scene.animationTimeline.push({
      type: "intro",
      name: "getup from bed",
      facing: "left",

      introAnim: {
        spritesheet: Loader.get("ricka1s1"),
        starting: "wake",
        location: {x:500, y:200}
      }//,
      //timerDef:
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

      timerDef: {
        type: "animation",
        animSpec: scene.animations["idleWindowRays"],
        offset: 5
      }
    });

    scene.animationTimeline.push({
      type: "transition",
      //walking somewhere
      name: "walking from  alarmclock to switch",

      facing: "right",
      length: 300 //timelength til rick stops and goes to his idle


    });

    scene.animationTimeline.push({
      type: "oa", //objectaction animation
      tag: "switch"//link to scene.objects
    });

    scene.animationTimeline.push({
      type: "transition",
      //walking somewhere
      name: "walking from to the poster from the lights",

      facing: "left",
      length: 850 //timelength til rick stops and goes to his idle
    });

    scene.animationTimeline.push({
      type: "oa", //objectaction animation
      tag: "poster",

      timerDef: {
        type: "fade",
        desc: "end fade",
        offset: 2000,
        opaque: {stop: 0},
        exit: true,
        displayLength: 1000
      }
    });

    return scene;
  }

  return scene1;
});