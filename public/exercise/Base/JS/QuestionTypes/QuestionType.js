/*
  This is the base object for a Question Type. This is usually a grouping of
    questions, such as Operations for add, remove, and find questions.

  Documentation:
    constructor (questionData : Array of QuestionData,
                 numQuestionsArr : Array of int,
                 answerType : Array of AnswerType,
                 [prevModel : Model])
      Initializes the QuestionType, including initializing all of its questions.
      Arguments:
        questionData     Array of QuestionData  The QuestionData to pass into each
                                                  Question
        numQuestionsArr  Array of int           The number of each question to
                                                  initialize
        answerType       Array of AnswerType    The answer type to use for each
                                                  question
        prevModel        Model                  The model used by the previous
                                                  QuestionType [ OPTIONAL ]
    moveToNext ()
      Moves to the next question, if possible.
      Returns false if there are no more questions.
    moveToPrev ()
      Moves to the previous question, if possible.
      Returns false if it cannot move back any further.
    build () : Model
      Purpose: Builds a starting model to use for the QuestionType, if one was not
                 passed in.
      Arguments: None
      Returns: The new Model which was built
    setup (questionData : Array of QuestionData,
                 numQuestionsArr : Array of int,
                 answerType : Array of AnswerType,
                 [prevModel : Model]) : Model
      Purpose: Performs initial setup of the QuestionType, including setting up
                 all Questions.
      Arguments: These are all the same as provided to the constructor.
      Returns: The final state of the model. This is the last question's answer.
    scrambleQuestionOrder ()
      Purpose: Scrambles the order of all questions so that they are randomized.
      Arguments: None
      Returns: None
    containsQuestionNum (qNum) : boolean
      Returns true if this QuestionType has qNum questions (and qNum is accessible);
        otherwise returns false.
    draw ()
      Draws the current Question to the screen.
    showAnswer (div : DOMObject)
      Purpose: Draws the current Question's answer to the given div.
      Arguments:
        div  DOMObject  The DOM Object to display the answer inside of
      Returns: None
    check (...) : boolean
      Purpose: Checks if the given answer is correct.
      Arguments: All arguments are passed straight through to the Question.
                 See Question for documentation ...
      Returns: Boolean. True if the given answer is correct.
    isInputValid (input : string) : boolean
      Returns true if the given input is valid for the current question.
    canSetActive ()
      Returns true if the current question allows elements to be set as active.

  READ-ONLY PROPERTIES:
    name  string  The name of the QuestionType

  QuestionData
    See Question.js for QuestionData documentation.

*/

/*jshint esversion: 6 */ 'use strict';

class QuestionType {
  constructor(questionData, numQuestionsArr, answerTypesClassName, prevModel)
  {
    this.questions = [ ];
    this.setup(questionData, numQuestionsArr, answerTypesClassName, prevModel);

    this.currQuestion = 0;
  }

  // name
  get name () {
    return this.constructor.name;
  }

  getQuestions() { return this.questions; }

  size () { return this.questions.length; }

  setNumQuestionRequired(n)
  {
    var temp = this.numQuestionsRequired;
    this.numQuestionsRequired = n;
    return temp;
  }

  getCurrentQuestion () { return this.questions [this.currQuestion]; }
  getQuestion (index) {
    if (index < 0)
      index = this.questions.length + index;
    return this.questions [index];
  }
  getAnswer (index) {
    var q = index ? this.getQuestion (index) : this.getCurrQuestion();
    return q && q.getAnswer ();
  }

  setCurrQuestion (curr) {
    if (curr < 0)
    {
      console.error("From inside setCurrQuestion, curr is negative.");
      return false;
    }

    if (curr >= this.questions.length)
    {
      console.error("From inside setCurrQuestion, curr is too high.");
      return false;
    }

    var temp = this.currQuestion ;
    this.currQuestion = curr;
    return temp;
  }

  moveToNext ()
  {
    return this.setCurrQuestion (this.currQuestion + 1);
  }

  moveToPrev ()
  {
    return this.setCurrQuestion (this.currQuestion - 1);
  }

  build()
  {
    return null; // we want this to do nothing, unless overloaded.
  }

  //if you want to modify this behavior, for example to scramble question order, override this method in the subclass, copying it, except add scramble or whatever extra functionality
  setup(questionData, numQuestionsArr, answerTypesClassName, prevModel)
  {
    if (!questionData) {      //param checking
      if (DEBUG) { console.error("From inside QuestionType.setup(), falsy param."); }
      return;
    }

    var thisQuestion = null;
    for (var index in questionData)
    {
        for (let i = 0; i < numQuestionsArr[index]; i++)
        {
          thisQuestion = questionData[index];
          this.questions.push(new thisQuestion.class(thisQuestion, answerTypesClassName[index]));
        }
    }

    //would scramble here if desired using scramble question order

    //TODO if desired to have a prebuilt data structure DOO ITT HERE
    var x = prevModel || this.build ();
    for (let i = 0; i < this.questions.length; i++)
    {
      x = this.questions [i].generate (x);
    }

    return x;
  }

  //randomizeOrder = null

  scrambleQuestionOrder() {
    this.questions = ODSRandom.scramble (this.questions);
  }

  containsQuestionNum(questionNumber) { return this.questions.length > questionNumber; }

  draw ()
  {
    this.getCurrentQuestion ().display ();
  }

  showAnswer (div)
  {
    this.getCurrentQuestion ().displayAnswer (div);
  }

  check ()
  {
    var currentQuestion = this.getCurrentQuestion ();
    return currentQuestion.check.apply (currentQuestion, arguments);
  }


  // input
  isInputValid (input)
  {
    return this.getCurrentQuestion ().isValidInput (input);
  }

  // setting active
  canSetActive ()
  {
    return this.getCurrentQuestion ().canSetActive ();
  }
}
