/**
 * Created by niko on 12/14/13.
 */

//scene 1 script

//name? always rick talking?

define([],function(){
  var script = {}

  script["Oatmeal Hot"] = "Heat up Rick's oatmeal";
  script["Oatmeal Cold"] = "Cool down Rick's oatmeal";
  script["Oatmeal Null"] = "Do nothing";

  script["Calendar Mom"] = "Mark Rick's calendar with his Mother's birthday as yesterday";
  script["Calendar Switch"] = "Switch Rick's calendar to a locomotive calendar";
  script["Calendar Null"] = "Do nothing";

  script["Fridge Set"] = "Set fridge to attack Rick";
  script["Fridge Eggs"] = "Replace all of Rick's food with eggs";
  script["Fridge Null"] = "Do nothing";



  script["oatmeal-option1"] = "How did this happen?";
  script["oatmeal-option2"] = "What demon caused this??";
  script["oatmeal-option3"] = "Mmm slop";

  script["calendar-option1"] = "...There is a guilty phone call in my future.";
  script["calendar-option2"] = "I knew this calendar was bad, but when did it get THIS bad?";
  script["calendar-option3"] = "Time is money";

  script["fridge-option1"] = "WWWAAaaaaaahhhhh! Guess I’ve got no lunch today.";
  script["fridge-option2"] = "Glorious";
  script["fridge-option3"] = "Ham & Cheese Rick style";

  //return an array of all the definitions {}
  return script
});