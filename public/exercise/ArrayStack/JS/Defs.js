/*
  Main definitions
*/

/*jshint esversion: 6 */ 'use strict';
const NULL_CHARACTER = "∅";

const ELEM_EVENTS_ID = "elementEvents";
const TABS_EVENTS_ID = "tabbedEvents";

const DEF_MSG_LENGTH = 2 * 1000; // 2 seconds

var DEBUG = true;
var instructionsId = "instructions";
var questionId = "questions";

/*

var __MODULENAME__questionTypesClassNames = [];

  var __MODULENAME__questionData = [ {className : questionClassName, instructionsText : "do this" , parameters : {} } , ]
  //model
  var __MODULENAME__ = "";

var __MODULENAME__numberOfQuestionsRequired = [ ];
*/

var __MODULENAME__ = ArrayStack;

var questionTypesClassNames = [Operations];

var answerTypesClassNames = [[AddAnswer, GetAnswer, RemoveAnswer]];

var numberOfQuestionsRequired = [[6, 4, 6]];

  var questionData = [
    [{class : Add, instructionsText : "Illustrate the evolution of the collection given the following add method:"},
    {class : Get, instructionsText : "Illustrate the evolution of the collection given the following get method:"} ,
    {class : Remove, instructionsText : "Illustrate the evolution of the collection given the following remove method:"}]
                      ];

var __addMinValue__ = 1;
var __addMaxValue__ = 8;

/*load order:
MUST BE LOADED AFTER QUESTIONS AND QUESTIONTYPES AND RANDOM
AND BEFORE EXERCISE
*/
