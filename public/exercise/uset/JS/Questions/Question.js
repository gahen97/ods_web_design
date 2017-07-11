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
    this.parameters = this.generateParameters();
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


  display(div)
  {
    div = div || this.getDiv() || $(".questionBody") || null;

    if (!div) { console.error("From question.display() div is null."); return; }

    this.displayInstructions(div);
    this.displayParameters (div);
    this.displayModel (div);
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
      p.text (this.fullName);
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
      answer.setModel (prevAnswer.getModel ().copy ());

    answer.setData (this.computeAnswerData ());

    return answer;
  }

  generateModel (prevAnswer)
  {
    if (!prevAnswer) return;

    // just set to the previous answer's model
    this.setModel (prevAnswer.getModel ());
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
}

Question.nextId = 0;
