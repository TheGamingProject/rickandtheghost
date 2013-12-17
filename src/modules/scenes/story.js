/**
 * story.js
 *
 * Created by niko on 12/16/13.
 */

define([],function(){
  return {
    name: "Rick and the Ghost",

    scenes: [
      "scene4",
      "scene1",
      "scene2"
    ],


    goals: [
      {
        name: "Suspense master",
        desc: "you needa get super suspensed bro",
        stats: [{
          type: "suspense",
          comparison: ">",  //player comparision amount
          amount: 30 //player.suspense > 30
        }]
      },
      {
        name: "Lazy ",
        desc: "be the laziest ghost",
        stats: [{
          type: "suspense",
          comparison: "<",
          amount: 10
        },{
          type: "scared",
          comparison: "<",
          amount: 10
        },{
          type: "goodday",
          comparison: "<",
          amount: 10
        },{
          type: "goodday",
          comparison: ">",
          amount: -10
        }]
      }
    ]

  };

});
