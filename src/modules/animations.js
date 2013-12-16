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
      walkl: [10,39],
      walkr: [40,69],
      interactl: [70,99,"idlel"],
      interactr: [100,129,"idler"],
      knockdown: [130,159,"downl"],
      getup: [160,189,"idlel"]
    }
  }


  //A1S1

  animations.ricka1s1 = {
    framerate: 33,
    images: ["assets/a1s1/ricka1s1.png"],
    frames: {width: 300, height: 300, count: 40},
    animations: {
      sleep: {
        frames: [0,0, false]
      },
      awoke: [39],
      wakeup: [10,39,false,.2]
    }
  }

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
  };

  animations["switch"] = {
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
      "reaction-break": [10,39,"idleoffbroken"],
      "objectaction-turnon":  [40,54,"idleon"],
      "objectaction-turnonbroken": [60,74,"idleonbroken"]
    }
  };

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
      "reaction-unfold": [10,24,"idleunfold"],
      "reaction-mark": [30,59,"idlemarked"]
    }
  }


  var that = {};

  var spriteSheets = {};
  var loaded = false;

  that.loadAnimations = function(callback){
    /*var total = 0;
    $.each(animations,function(index, value){
      spriteSheets[index] = new createjs.SpriteSheet(value);
      if (!spriteSheets[index].complete)
          spriteSheets[index].addEventListener("complete", function(){
          total++;
            debugger;
        });
    });


    setTimeout(function(){
      loaded = true;
      callback();
    },10000)*/

  };

  that.get = function(name){
    /*if(!loaded)
      throw "we need to load!"
*/
    if(!animations[name]){
      throw "Animation doesn't exist: "+name;
    }

    return new createjs.SpriteSheet( animations[name]);
  }

  return that;
});