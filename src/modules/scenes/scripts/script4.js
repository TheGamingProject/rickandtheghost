/**
 * Created by niko on 12/14/13.
 */

//scene 1 script

//name? always rick talking?

define([],function(){
  var script = {}

  //Dialogue
  script["cabinet-option1"] = "I DIDN'T NEED THOSE FILES OR ANYTHING!";
  script["cabinet-option2"] = "That Shelly Greybottom is an excellent secretary";
  script["cabinet-option3"] = "Another day another dollar";

  script["motiv-option1"] = "How did they know I LOVE GHOST CAT";
  script["motiv-option2"] = "Am I ...Am I being watched??";
  script["motiv-option3"] = "";

  script["radio-option1"] = "I don't understand dubstep at all";
  script["radio-option2"] = "Sounds just like home";
  script["radio-option3"] = "";
  
  //Buttons
  //cabinet buttons
  script["cabinet-button1"] = "Posses Rick's filing cabinet";
  script["cabinet-button2"] = "Sort Rick's files";
  script["cabinet-button3"] = "Do nothing";
  
  //Motiv buttons
  script["motiv-button1"] = "Replace with \"Ghost Cat\" poster";
  script["motiv-button2"] = "Replace with poster of eggs";
  script["motiv-button3"] = "Do nothing";
  
  //radio buttons
  script["radio-button1"] = "Change to recording of Lions mating";
  script["radio-button2"] = "Change radio station to yodeling";
  script["radio-button3"] = "Do nothing";


  //return an array of all the definitions {}
  return script
});