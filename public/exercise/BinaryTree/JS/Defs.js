/*
  Main definitions
*/

/*jshint esversion: 6 */ 'use strict';

/* Constants go here */
const NULL_CHARACTER = "∅";

const DEF_PLUMB_CLASS = "plumba-wumba";

const ELEM_EVENTS_ID = "elementEvents";
const TABS_EVENTS_ID = "tabbedEvents";
const ENDPOINT_EVENTS_ID = "endpointEvents";

const DIRECTION_LEFT = "left";
const DIRECTION_RIGHT = "right";

const DEF_MSG_LENGTH = 2 * 1000; // 2 seconds

const LEVEL_HEIGHT = 70;

var DEBUG = false;
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
var __MODULENAME__ = BinarySearchTree;

// The Question Types to be used for the exercise.
var questionTypesClassNames = [Terminology, Identify, Traversals];

// Answers to be used for each Question Type.
// Note this is a 2D Array, where the first dimensions maps it to a Question Type,
//   which is then an array of different kinds of questions for that QType.
var answerTypesClassNames = [
  [DepthAnswer, HeightAnswer, SizeAnswer],
  [RootAnswer, LeafAnswer, LeftChildAnswer, RightChildAnswer],
  [BFSAnswer, DFSAnswer, POTAnswer, PreOTAnswer, IOTAnswer]
];

// Number of questions required for different questions.
// Note this follows the same structure as answer types

var numberOfQuestionsRequired = [[4, 4, 4], [1, 1, 1, 1], [1, 1, 1, 1, 1]];
var __findMinParam__ = 1;
var __findMaxParam__ = 19;
var __depthMinParam__ = 1;
var __depthMaxParam__ = 6;
var __heightMinParam__ = 1;
var __heightMaxParam__ = 6;
var __sizeMinParam__ = 1;
var __sizeMaxParam__ = 8;

// questionData. Should be a 2D array of objects, where:
//   First dimension maps to a Question Type
//   Second dimension maps to a Question
//   Object contains:
//     class: The class for the Question
//     instructionsText: Some instructions to be shown for the question

  var questionData = [
    [
      {class: Depth, instructionsText: "Identify all nodes with the given depth."},
      {class: Height, instructionsText: "Identify all nodes with the given height."},
      {class: Size, instructionsText: "Identify all nodes with the given size."}
    ],
    [
      {class: Root, instructionsText: "Identify the root node."},
      {class: Leaf, instructionsText: "Identify all nodes that are leaves."},
      {class: LeftChild, instructionsText: "Identify all nodes that are left children."},
      {class: RightChild, instructionsText: "Identify all nodes that are right children."},
    ],
    [
     {class : BFS, instructionsText: "Traverse the tree using a Breadth First Search traversal."},
     {class : DFS, instructionsText: "Traverse the tree using a Depth First Search traversal."},
     {class : PostOrder, instructionsText: "Traverse the tree using a Pre-Order Traversal."},
     {class : PreOrder, instructionsText: "Traverse the tree using a Post-Order Traversal."},
     {class : InOrder, instructionsText: "Traverse the tree using an In-Order Traversal."},
   ]
];

var NUM_STARTING_ADDITIONS = 20;
var MIN_PREADD             = 1;
var MAX_PREADD             = 35;

// Min and max values to be used as parameters for different questions
/*
var __templateMinParam__ = 1;
var __templateMaxParam__ = 10;
*/

/*load order:
MUST BE LOADED AFTER QUESTIONS AND QUESTIONTYPES AND RANDOM
AND BEFORE EXERCISE
*/
