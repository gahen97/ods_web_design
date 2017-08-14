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
    this.setCurrQuestion (this.currQuestion + 1);
  }

  moveToPrev ()
  {
    this.setCurrQuestion (this.currQuestion - 1);
  }

  build()
  {
    return; // we want this to do nothing, unless overloaded.
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
