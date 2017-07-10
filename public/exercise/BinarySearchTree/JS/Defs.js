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

var __MODULENAME__ = BinarySearchTree;

var questionTypesClassNames = [Operations];

var answerTypesClassNames = [[AddAnswer]];

var numAddQuestions = 10;

var numberOfQuestionsRequired = [[numAddQuestions]];

  var questionData = [
    [{class : Add, instructionsText : "Illustrate the evolution of the BST given the following add method:"}]
                      ];

var __addMinParam__ = 1;
var __addMaxParam__ = 69;

/*load order:
MUST BE LOADED AFTER QUESTIONS AND QUESTIONTYPES AND RANDOM
AND BEFORE EXERCISE
*/
