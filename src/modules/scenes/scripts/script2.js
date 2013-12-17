/**
 * Created by niko on 12/14/13.
 */

//scene 1 script

//name? always rick talking?

define([],function(){
  var script = {}

  //Buttons
  //Oatmeal buttons
  script["oatmeal-button1"] = "Heat up Rick's oatmeal";
  script["oatmeal-button2"] = "Cool down Rick's oatmeal";
  script["oatmeal-button2"] = "Do nothing";
  
  //Calendar
  script["calendar-button1"] = "Mark Rick's calendar with his Mother's birthday as yesterday";
  script["calendar-button2"] = "Switch Rick's calendar to a locomotive calendar";
  script["calendar-button3"] = "Do nothing";
  
  //Fridge
  script["fridge-button1"] = "Set fridge to attack Rick";
  script["fridge-button2"] = "Replace all of Rick's food with eggs";
  script["fridge-button3"] = "Do nothing";
  
  //Options
  //Oatmeal
  script["oatmeal-option1"] = "Gross! This oatmeal is blazing!";
  script["oatmeal-option2"] = "Mmm perfectly cold oatmeal";
  script["oatmeal-option3"] = "Mmm slop";
  
  //Calendar
  script["calendar-option1"] = "...There is a guilty phone call in my future.";
  script["calendar-option2"] = "I knew this calendar was bad, but when did it get THIS bad?";
  script["calendar-option3"] = "Time is money";
  
  //Fridge
  script["fridge-option1"] = "WWWAAaaaaaahhhhh! Guess I’ve got no lunch today.";
  script["fridge-option1"] = "Glorious";
  script["fridge-option1"] = "Ham & Cheese Rick style";

  //return an array of all the definitions {}
  return script
});