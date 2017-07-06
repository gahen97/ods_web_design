/*jshint esversion: 6 */ 'use strict';

class Exercise {
  constructor()
  {
    //array of question types
    this.questionTypes = [ ];
    this.currQTypeIndex = 0;   //index into questionTpes, representing the current question type
    this.absQNum = 0;       //this is the question number from the user's side. For example if you have three question types, each with 10 questions, 26 would be stored here for the 26th question, not [2][6]
  }

  getCurrQuestion () { return this.getCurrQuestionType ().getCurrentQuestion (); }
  getCurrQuestionId () { return this.getCurrQuestion ().getId (); }
  getCurrQuestionType () { return this.questionTypes [this.currQTypeIndex]; }

  setCurrQuestionType(param)
  {
    if (param < 0)
    {
      console.error("From inside setCurrQuestionType, param is negative.");
      return false;
    } else if (param >= this.questionTypes.length)
    {
      console.error("From inside setCurrQuestionType, param is too high.");
      return false;
    }

    var temp = this.currQTypeIndex;
    this.currQTypeIndex = param;
    return temp;
  }

  getQuestionTypes() { return this.questionTypes; }

  setQuestionTypes(toSet)
  {
    var temp = this.questionTypes;
    this.questionTypes = toSet;
    return temp;
  }

  getAbsQNum() { return this.absQNum; }

  setAbsQNum(param)
  {
    if (param < 0)
    {
      console.error("From Inside setAbsQNum, param is less than 0.");
    }

    //TODO maybe check upper bound?

    var temp = this.absQNum;
    this.absQNum = param;
    return temp;
  }

  convertQuestionNumberTo2d(questionNumber)
  {
    if (questionNumber < 0)
    {
      console.error("From inside convertQuestionNumberTo2d, questionNumber is negative.");
      return false;
    }

    var toReturn = {"1d": -1, "2d": -1};

    for (var questionType in this.questionTypes)
    {
      if (this.questionTypes[questionType].containsQuestionNum(questionNumber) )
      {
        toReturn["1d"] = parseInt(questionType);
        break;
      }
      questionNumber = questionNumber - this.questionTypes[questionType].size();
    }

    if (toReturn["1d"] === -1)
    {
      console.error("From inside convertQuestionNumberTo2d, questionNumber is out of bounds (too high).");
      return false;
    }

    toReturn["2d"] = parseInt(questionNumber);

    return toReturn;
  }

  goToQuestion(questionNumber)
  {
    var questionNumber2d = this.convertQuestionNumberTo2d(questionNumber);
    //(questionNumber2d = convertQuestionNumberTo2d(questionNumber)) ? questionNumber2d : console.error("how dare you turn this house into a house of lies"); return false;
    //cool syntax, but not readable

    if (!questionNumber2d)
    {
      console.error("From inside goToQuestion, convertQuestionNumberTo2d returned false.");
      return false;
    }

    this.setCurrQuestionType(questionNumber2d["1d"]);

    this.getCurrQuestionType().setCurrQuestion(questionNumber2d["2d"]);

    this.setAbsQNum (questionNumber);

    this.refresh();
  }

  //TODO refactor to goToQuestion(number? id?)

  next ()
  {
    this.goToQuestion(this.getAbsQNum() + 1);
  }

  prev ()
  {
    this.goToQuestion(this.getAbsQNum() - 1);
  }


  clear()
  {
    this.questionTypes = [ ];
  }

  setup()
  {
    //need an array of qtypes for exercise
    //need an array of questions and a number of questions required for qtypes
    //questions need instructions, params, and maybe answer

    this.clear();

    for (var index in questionTypesClassNames)
    {
      this.questionTypes.push(new questionTypesClassNames[index](questionData[index], numberOfQuestionsRequired[index], answerTypesClassNames[index]));
    }

    //if desired, scramble


    this.setAbsQNum (0);
  }


  // INPUT
  isInputValid (input)
  {
      return this.getCurrQuestionType ().isInputValid (input);
  }

  get validInputStr ()
  {
    return this.getCurrQuestion ().validInputStr;
  }

  // active check
  canSetActive(){
    return this.getCurrQuestionType ().canSetActive ();
  }

  //TODO refactor
  getAnswer ()
  {
    return this.getCurrQuestionType ().getAnswer ();
  }
  showAnswer (div)
  {
    this.getCurrQuestionType ().showAnswer (div);
  }

  check (user, active)
  {
    return this.getCurrQuestionType ().check (user, active);
  }

  start ()
  {
    // NOTE: start for now just starts the first question .....
    this.refresh ();
    //might want to build stuff
  }

  refresh ()
  {
    this.getCurrQuestionType ().draw ();
  }
}
