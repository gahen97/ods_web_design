/*
  Main definitions.

  MUST Overload:
    questionTypesClassNames    Array of QuestionType     Various Question Types to use for the exercise
    answerTypesClassNames      2D Array of AnswerType    Answers to each question within a given QuestionType
    questionData               2D Array of QuestionData  Question Data for each question within a given QuestionType
    numberOfQuestionsRequired  2D Array of int           Number of questions required for each question within given QuestionType

  2D Array Definitions:
    The first dimension corresponds to the QuestionType.
    The second dimension corresponds to a given Question within the QuestionType.

  QuestionData:
    Should be an object with two key-value pairs:
      className         Question  The class to use for the question
      instructionsText  string    Instructions to use for the question

  FOR EXAMPLE:
    If QuestionType is Operations & Questions are Add, Remove, Find:
      questionTypesClassNames = [Operations]
      answerTypesClassNames   = [[AddAnswer, FindAnswer, RemoveAnswer]]
      questionData            = [[
        {className: Add, instructionsText: "Demonstrate adding an element:"},
        {className: Find, instructionsText: "Demonstrate finding an element:"},
        {className: Remove, instructionsText: "Demonstrate removing an element:"}
      ]]
      numberOfQuestionsRequired = [
        [numAddQuestions, numFindQuestions, numRemoveQuestions]
      ]

  Note that other definitions that do not deal with the DOM should be defined
    here. Also, if any parameters are needed for questions, they should be
    defined here and used inside the Question classes.
*/

/*jshint esversion: 6 */ 'use strict';
const ELEM_EVENTS_ID = "elementEvents";
const TABS_EVENTS_ID = "tabbedEvents";

const DEF_MSG_LENGTH = 2 * 1000; // 2 seconds

var DEBUG = true;
var instructionsId = "instructions";
var questionId = "questions";

// MODEL
var __MODULENAME__ = SkiplistSSet;
const SENTINEL_VALUE = 'S';

// QUESTION TYPES
var questionTypesClassNames = [Operations];

// ANSWERS
var answerTypesClassNames = [[FindAnswer]];

// QUESTIONS
var numQuestions = 10;
var numberOfQuestionsRequired = [[5]];

var questionData = [
    [
      {class : Find, instructionsText : "Display the path to the given element in the SkipList:"}
    ]
];

// PARAMETERS
var __param__ = null;

/*load order:
MUST BE LOADED AFTER QUESTIONS AND QUESTIONTYPES AND RANDOM
AND BEFORE EXERCISE
*/
