/**
 * assets.js for Rick and the Ghost
 *
 * Created by niko on 12/29/13.
 */

define(function(){
  return {
    fonts: {
      "rickDialog": {
        fontFamily: "RBNo2",
        color: "#ff7700",
        size: 26
      },

      "hauntObjectOptions": {
        fontFamily: "RBNo2",
        color: "#ffffff",
        size: 24
      }
    },
    //stuff that has to be loaded
    //  for now: (maybe later the story is read scene by scene amd animations are gathered like that)

    whenLoad: "allatbeginning", //NYI (placeholder)

    stills: [
      //menu/goal ui
      "assets/start/startbackground.png",
      "assets/start/startSuspicionLow.png",
      "assets/end/endneutral.png",

      //scene ui
      "assets/ui/lowerbar.png",
      "assets/ui/option-dash.png",
      "assets/ui/arrow0.png",

      "assets/ui/state-haunting.png",
      "assets/ui/state-recording.png",

      //scene1
      "assets/scenes/a1s1/background.png",

      //scene2
      "assets/scenes/a1s2/background.png",

      //scene4
      "assets/scenes/a2s1/background.png"
    ],
    animations: [
      //global
      "rickglobal",

      //scene1
      "ricka1s1","alarmclock","switch","poster", "windowrays",

      //scene2
      "calendar","fridge", "oatmeal",

      //scene3
      "cabinet", "motiv", "radio"
    ],

    sound: []
  };
});