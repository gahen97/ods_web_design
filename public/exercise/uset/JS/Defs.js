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

var __MODULENAME__ = Uset;

var questionTypesClassNames = [Operations];

var answerTypesClassNames = [[AddAnswer, FindAnswer, RemoveAnswer]];

var numAddQuestions = 10;
var numFindQuestions = 4;
var numRemoveQuestions = 10;

var numberOfQuestionsRequired = [[numAddQuestions, numFindQuestions, numRemoveQuestions]];

  var questionData = [
    [{class : Add, instructionsText : "Illustrate the evolution of the collection given the following add method:"},
    {class : Find, instructionsText : "Illustrate the evolution of the collection given the following find method:"} ,
    {class : Remove, instructionsText : "Illustrate the evolution of the collection given the following remove method:"}]
                      ];

var __addMinParam__ = 1;
var __addMaxParam__ = 8;
var __findMinParam__ = 0;
var __findMaxParam__ = 16;
var __removeMinParam__ = 1;
var __removeMaxParam__ = 8;

/*load order:
MUST BE LOADED AFTER QUESTIONS AND QUESTIONTYPES AND RANDOM
AND BEFORE EXERCISE
*/
