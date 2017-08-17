/*
  The Base Class for all questions to be asked.
  This controls:
    - Instructions
    - Question name, full name
    - Question's starting model
    - Answer

  Documentation:
    constructor (questionData : QuestionData, answerType : AnswerType)
      Initializes a new Question from the given questionData & answerType.
      Arguments:
        questionData  QuestionData  See below (QuestionData) for documentation.
        answerType    AnswerType    The answer type to initialize for this question's answer.
    generateParameters ()
      Purpose: Generates the parameters for the question.
       NOTE: This is done after the model is initialized, so the model may be
               used to help generate parameters.
    generate (prevModel : Model) : Model
      Purpose: Generates the question's data. This includes the question's model,
                 parameters, and answer's model.
      Arguments:
        prevModel  Model  The previous question's answer's model. This is the
                            starting model for the current question.
      Returns: The new answer's model.
    display (div : DOMObject)
      Purpose: Displays the question in the given div, including instructions, parameters,
                 and model.
      Arguments:
        div  DOMObject  The element to display the question in
      Returns: None
    displayAnswer (div : DOMObject)
      Purpose: Displays the answer in the given element.
      Arguments:
        div  DOMObject  The element to display the answer in
      Returns: None
    displayModel (div : DOMObject)
      Purpose: Displays the question's model in the given div.
      Arguments:
        div  DOMObject  The element to display the model in
      Returns: None
    displayParameters (div : DOMObject)
      Purpose: Displays the question (ex. add (5)) in the given div.
      Arguments:
        div  DOMObject  The element to display the question inside of
      Returns: None
    displayInstructions (div : DOMObject)
      Purpose: Displays the question's instructions in the given div.
      Arguments:
        div  DOMObject  The element to display the instructions inside of
      Returns: None
    generateAnswer (prevAnswer : Model) : Model
      Purpose: Generates the question's answer given the previous question's answer.
      Arguments:
        prevAnswer  Model  The correct implementation of the model for the previous question
      Returns: The newly generated answer's model
    generateModel (prevModel : Model)
      Purpose: Generates the model to be used as the starting point for the question,
                 given the previous question's answer.
      Arguments:
        prevModel  Model  The correct implementation of the previous question.
      Returns: None
    getParametersString ()
      Returns a stringified version of the question's parameters.
      By default, this is just String (parameters), but this MUST be overloaded
        to use with any object (will default to [ Object object ] otherwise).
    check (userAnswer : Model) : boolean
      Purpose: Checks if the given answer is correct.
      Arguments:
        userAnswer  Model  The user's answer for the question.
      Returns: Boolean. True if the user's answer is correct ; false otherwise.
    isValidInput (input : string) : boolean
      Purpose: Checks if given input can be used for the question.
      Arguments:
        input  string  The input to check
      Returns: Boolean. True if the input is valid.
    canSetActive () : boolean
      Returns a boolean determining if an element can be set active for the question.
    start()
      Purpose: Called at the start of the question ; initializes the question.

    READ-ONLY PROPERTIES:
      name          string  The short name for the question. For example, "add"
      fullName      string  The long name for the question. For example, "add (5)"
                              This is used for the tabbing system.
      exerciseName  string  The name to display when running the question.
      validInputStr string  The range of valid input for the question. For example,
                              "0 - 10"

    QuestionData:
      instructionsText  string  The text to display as instructions for the question.
      id                int     The ID to use for the question. [ OPTIONAL ]

*/
/*jshint esversion: 6 */ 'use strict';

class Question {
    static getNextId()
    {
      return Question.nextId;
    }

    static setNextId(i)
    {
      var temp = Question.nextId;
      Question.nextId = i;
      return temp;
    }

  constructor(questionData, answerTypesClassName)
  {
    questionData = questionData || { };
    this.parameters = null;
    this.instructions = !!questionData.instructionsText ? new Instructions(questionData.instructionsText) : null;     //!! converts truthy to true
    this.id = questionData.id || Question.nextId++;
    this.div = null;

    if (answerTypesClassName)
    {
      this.answer = new answerTypesClassName();
    }

    if (typeof(__MODULENAME__) !== "undefined" && __MODULENAME__)
    {
      this.model = new __MODULENAME__();
    }
  }


  // name
  get name () {
    return this.constructor.name;
  }

  get fullName () {
    return this.name.toLowerCase() + "(" + this.getParametersString() + ")";
  }

  get exerciseName () { return this.fullName; }

  // instructions, params, etc
  getInstructions()
  {
    return this.instructions;
  }

  getParameters()
  {
    return this.parameters;
  }

  setParameters(param)
  {
    var temp = this.parameters;
    this.parameters = param;
    return temp;
  }

  setId(i)
  {
    var temp = this.id;
    this.id = i;
    return temp;
  }

  getId() { return this.id; }


  getDiv() { return this.div; }

  setDiv(div)
  {
    var temp = this.div;
    this.div = div;
    return temp;
  }

  getModel() { return this.model; }

  setModel(model)
  {
    var temp = this.model;
    this.model = model;
    return temp;
  }

  generateParameters()
  {
    console.error("From inside question's generateParameters, generate parameters was not overloaded from this question subclass.");
    return false;
  }

  generate (prevModel) {
    // generate model
    this.generateModel (prevModel);

    // generate parameters !!! do this after so we have
    //  access to the model
    this.parameters = this.generateParameters();

    // generate & return answer
    return this.generateAnswer(prevModel);
  }


  display(div)
  {
    div = div || this.getDiv() || $(".questionBody") || null;

    if (!div) { console.error("From question.display() div is null."); return; }

    this.displayInstructions(div);
    this.displayParameters (div);
    this.displayModel (div);

    this.start ();
  }

  displayAnswer(div)
  {
    var answerDiv = $(".modelMain", div);
    this.answer.display(answerDiv);
  }

  displayModel (div)
  {
    var modelDiv = $(".modelBody", div);
    this.model.draw (modelDiv);
  }

  displayParameters (div)
  {
      var p   = $(".parametersBody", div);
      var sp  = $("<span class='params-text'>" + this.exerciseName + "</span>");
      p.html (sp);

      /* TODO */
      Animation.run ("glow", sp, {duration: 1000})
  }

  displayInstructions(div)
  {
    var instructionsDiv = $(".instructionsBody", div);
    this.instructions.display(instructionsDiv);
  }

  generateAnswer(prevAnswer)
  {
    var answer = this.answer;
    if (prevAnswer)
      answer.setModel (prevAnswer.copy ());

    answer.setData (this.computeAnswerData ());

    return answer.getModel();
  }

  generateModel (prevAnswer)
  {
    if (!prevAnswer) return;

    // just set to the previous answer's model
    this.setModel (prevAnswer.copy ());
  }

  getAnswer ()
  {
    return this.answer.getModel ();
  }

  getParametersString()       //must overload if parameters is an object
  {
    return String(this.parameters);
  }

  check(userAnswer)
  {
    return this.answer.check(userAnswer);
  }

  // input
  isValidInput (input)
  {
    return false;
  }

  get validInputStr ()
  {
    return "";
  }

  // setting active
  canSetActive(){ return false; }

  //static generateParameters()

  start(){}
}

Question.nextId = 0;
