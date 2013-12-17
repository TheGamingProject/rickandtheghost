/**
 * Player.js
 *
 * Created by niko on 12/14/13.
 */


var STATS = {
  suspense: 1,
  scared: 2,
  goodday: 3
};


define([],function (){
  var Player = function( args){
    var that = {};
    args = args || {};

    //private instance variables
    var stats = {suspense: 1, scared: 0, goodday: 12};

    var updateUIcallback;

    //public functions
    that.getStat = function (type){
      if(!type || !STATS[type]){
        throw "that is not a valid type: "+type;
      }

      return stats[type];
    }

    that.changeStat = function (args){//meterStatAffected
      if(!args)
        return;
        //throw "null stats, should be an array[]";

      $.each(args, function(type, amt){
        //type, num
        if(!amt || typeof amt != "number"){
          throw "No, wrong wrong, thats not a num: " + amt;
        }
        if(!type || typeof type != "string"){
          throw "incorrect type type :) "+type;
        }
        if(!STATS[type]){
          throw "thats not type we are doing today"
        }

        stats[type] += amt;
        console.log("Player recieves "+amt+" of stat["+type+"]");
      });

      if(updateUIcallback)
        updateUIcallback();
    };

    that.addChangeStatCallback = function(callback){
      updateUIcallback = callback;

    };



    return that;
  };

  return Player;
});
