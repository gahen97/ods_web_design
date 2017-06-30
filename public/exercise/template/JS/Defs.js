/*jshint esversion: 6 */

var DEBUG = true;
var instructionsId = "instructions";

/*

var __MODULENAME__questionTypesClassNames = [];

  var __MODULENAME__questionData = [ {className : questionClassName, instructionsText : "do this" , parameters : {} } , ]
  //model
  var __MODULENAME__ = "";

var __MODULENAME__numberOfQuestionsRequired = [ ];
*/

var questionTypesClassNames = [DummyQuestionType1, DummyQuestionType2, DummyQuestionType3];

  var questionData = [                [{class : DummyQuestion1, instructionsText : "do this1" , parameters : {randomNumber : ODSRandom.getRandomIntInclusive(1,10)}}] ,
                                      [{class : DummyQuestion2, instructionsText : "do this2" , parameters : {randomNumber : ODSRandom.getRandomIntInclusive(1,10)}}] ,
                                      [{class : DummyQuestion3, instructionsText : "do this3" , parameters : {randomNumber : ODSRandom.getRandomIntInclusive(1,10)}}] ];
  //model
  var __MODULENAME__ = DummyModel;

var numberOfQuestionsRequired = [1,1,3];


/*load order:
MUST BE LOADED AFTER QUESTIONS AND QUESTIONTYPES AND RANDOM
AND BEFORE EXERCISE
*/
