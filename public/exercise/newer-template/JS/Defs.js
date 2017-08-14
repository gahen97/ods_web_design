/*
  Main definitions
*/

/*jshint esversion: 6 */ 'use strict';

/* Constants go here */
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

/* MODULENAME represents the working Model. This'll be used to create new models. */
var __MODULENAME__ = ModelTemplate;

// The Question Types to be used for the exercise.
var questionTypesClassNames = [QuestionTypeTemplate];

// Answers to be used for each Question Type.
// Note this is a 2D Array, where the first dimensions maps it to a Question Type,
//   which is then an array of different kinds of questions for that QType.
var answerTypesClassNames = [[AnswerTemplate]];

// Number of questions required for different questions.
// Note this follows the same structure as answer types

var numberOfQuestionsRequired = [[0]];

// questionData. Should be a 2D array of objects, where:
//   First dimension maps to a Question Type
//   Second dimension maps to a Question
//   Object contains:
//     class: The class for the Question
//     instructionsText: Some instructions to be shown for the question

  var questionData = [
    [{class : QuestionTemplate, instructionsText: "Instructions"}]
                      ];

// Min and max values to be used as parameters for different questions
/*
var __templateMinParam__ = 1;
var __templateMaxParam__ = 10;
*/

/*load order:
MUST BE LOADED AFTER QUESTIONS AND QUESTIONTYPES AND RANDOM
AND BEFORE EXERCISE
*/
