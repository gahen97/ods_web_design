/*
  Main definitions
*/

/*jshint esversion: 6 */ 'use strict';
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

var __MODULENAME__ = Template; // MODEL NAME HERE

var questionTypesClassNames = []; // INSERT EVERY QUESTION TYPE, [QType1, QType2, QType3]

/*
  Answer types are based on QTypes:
    First dimension relates to the Question Type
    Second dimension relates to each question of the QType
      Ex. If QTypes are [Operations], Questions are Add, Find, Remove, then this would be
        [
          [AddAnswer, FindAnswer, RemoveAnswer]
      ]
*/
var answerTypesClassNames = [ ];


/* Number of questions required for each question */
// This is the same as above, for answerTypesClassNames
var numberOfQuestionsRequired = [];

/*
  questionData looks like:
    [
    [
     {class: SOME_CLASS_NAME, instructionsText: "Instructions for the question"},
     {class: SOME_CLASS_NAME, instructionsText: "Instructions for the question"}
   ],
   [
    {class: SOME_CLASS_NAME, instructionsText: "Instructions"}
   ]
  ]

  Where first dimension is QType, second is Question.
*/

  var questionData = [];

/* Other constants & data to be used */

/*load order:
MUST BE LOADED AFTER QUESTIONS AND QUESTIONTYPES AND RANDOM
AND BEFORE EXERCISE
*/
