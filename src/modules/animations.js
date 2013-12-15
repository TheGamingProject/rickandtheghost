/**
 * List everything about an Animation here
 * - http://www.createjs.com/Docs/EaselJS/classes/SpriteSheet.html
 * Created by niko on 12/14/13.
 */



define([],function(){
  var animations = {}

  //spritesheet - http://www.createjs.com/Docs/EaselJS/classes/SpriteSheet.html
  animations.menuBG = {
    framerate: 1,
    images: ["assets/monkey.jpg"],
    //frames: {width: 232, height: 217, count: 1},
    frames: {width: 25, height: 100, count: 5},
    animations: {
      afk: [1,2,3,4,5] //incorrect
    }
  };


  //GLOBAL

  animations.rickglobal = {
    framerate: 33,
    images: ["assets/global/rickbase.png"],
    frames: {width: 300, height: 300, count: 190},
    animations: {
      idlel: {
        frames: [0]
      },
      idler: {
        frames: [1]
      },
      downl: {
        frames: [2]
      },
      walkl: {
        frames: [10,39,"idlel"]
      },
      walkr: {
        frames: [40,69,"idler"]
      },
      interactl: {
        frames: [70,99,"idlel"]
      },
      interactr: {
        frames: [100,129,"idler"]
      },
      knockdown: {
        frames: [130,159,"downl"]
      },
      getup: {
        frames: [160,189,"idlel"]
      }
    }
  }


  //A1S1

  animations.ricka1s1 = {
    framerate: 33,
    images: ["assets/a1s1/ricka1s1.png"],
    frames: {width: 300, height: 300, count: 40},
    animations: {
      sleep: {
        frames: [0]
      },
      wakeup: {
        frames: [10,39,"idlel"]
      }
    }
  }
/*
  animations.alarmclock = {
    framerate: 33,
    images: ["assets/a1s1/alarmclock.png"],
    frames: {width: 300, height: 300, count: 90},
    animations: {
      idle: {
        frames: [0]
      },

      "reaction-setearly": [10,39, false],
      "reaction-turnoff": [40,54, false], //post-click,
      "objectaction-setearly": [60,69], //
      "objectaction-turnoff": [70,79], //
      "objectaction-abstain": [80,89] //

    }

  };
*/
  animations.alarmclock = {
    framerate: 33,
    images: ["assets/a1s1/alarmclock.png"],
    frames: {width: 300, height: 300, count: 90},
    animations: {
      idle: {
        frames: [0]
      },
      idlebroken: {
        frames: [1]
      },

      "reaction-activated": [10,39,"idle"],
      "reaction-broken": [40,54,"idlebroken"],
      "objectaction-interactl": [60,89,"idle"]

    }
  }

  animations.poster = {
    framerate: 33,
    images: ["assets/a1s1/poster.png"],
    frames: {width: 120, height: 250, count: 60},
    animations: {
      idlefold: {
        frames: [0]
      },
      idleunfold: {
        frames: [1]
      },
      idlemarked: {
        frames: [2]
      },
      unfold: {
        frames: [10,24,"idleunfold"]
      },
      mark: {
        frames: [30,59,"idlemarked"]
      }
    }
  }

  animations.switch = {
    framerate: 33,
    images: ["assets/a1s1/switch.png"],
    frames: {width: 300, height: 300, count: 80},
    animations: {
      idleoff: {
        frames: [0]
      },
      idleon: {
        frames: [1]
      },
      idleoffbroken: {
        frames: [2]
      },
      idleonbroken: {
        frames: [3]
      },
      break: {
        frames: [10,39,"idleoffbroken"]
      },
      turnon: {
        frames: [40,54,"idleon"]
      },
      turnonbroken: {
        frames: [60,74,"idleonbroken"]
      }
    }
  }

  var animationFactory = function(name){
    if(!animations[name]){
      console.log("Animation doesn't exist: "+name);
      //throw "Animation doesn't exist: "+name;
    }
    return new createjs.SpriteSheet(animations[name]);
  }

  return animationFactory;
});