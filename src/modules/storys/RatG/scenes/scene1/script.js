/**
 * Created by niko on 12/14/13.
 */

//scene 1 script

//name? always rick talking?

define([],function(){
  var script = {}

  script["alarm-option1"] = "and the award for latest to work goes to: Rick";
  script["alarm-option2"] = "...maybe in my next dream I'll be a mighty king";
  script["alarm-option3"] = "*cough*cough*";

  script["switch-option1"] = "How did this happen?";
  script["switch-option2"] = "What demon caused this??";
  //script["switch-option3"] = "";

  script["poster-option1"] = "Hmm a red x? This is either bad or there is treasure to find";
  script["poster-option2"] = "Smooth like Jazz";
  //script["poster-option3"] = "";
  
  //Buttons
  //Alarm buttons
  script["alarm-button1"] = "Turn off Rick's alarm";
  script["alarm-button2"] = "Set Rick's alarm early";
  script["alarm-button3"] = "Do nothing";
  
  //Poster buttons
  script["poster-button1"] = "Mark Rick's poster";
  script["poster-button2"] = "Smooth out Rick's poster";
  script["poster-button3"] = "Do nothing";
  
  //Light switch buttons
  script["light-button1"] = "Turn on Rick's light";
  script["light-button2"] = "Break Rick's light switch";
  script["light-button3"] = "Do nothing";


  //return an array of all the definitions {}
  return script
});