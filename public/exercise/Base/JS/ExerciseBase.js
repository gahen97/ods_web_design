/*
  The main object controlling all aspects of the exercise,
    mainly being QuestionTypes and Questions.

  Documentation:
    constructor ()
      Takes no arguments.

    -- (getters and setters are not documented. self explanatory ...) --

    convertQuestionNumberTo2d (qN : int) : QuestionNumber2D
      Purpose: Converts an absolute question index into a QuestionType -> Question
                 index.
      Arguments:
        qN  int  Absolute question index. This is independent of QuestionType index.
      Returns: QuestionNumber2D. The QuestionType & Question indices to be set to.

    goToQuestion (questionNumber : int)
      Purpose: Sets the current question to the given absolute question number.
      Arguments:
        questionNumber  int  Absolute question index. See above.
      Returns: None

    next ()
      Moves the exercise to the next question.

    prev ()
      Moves the exercise to the previous question.

    reset ()
      Resets the question so as to reload everything.

    restart ()
      Refreshes the exercise and restarts the current question.

    clear ()
      Clears all Questions & Question Types.

    setup ()
      Sets up all questions and question types for the exercise.

    isInputValid (input : string) : boolean
      Purpose: Checks if a given input is valid for the current question.
      Arguments:
        input  string  The input to be checked
      Returns: Boolean. True if the input is valid.

    canSetActive () : boolean
      Purpose: Checks if the current question allows setting elements as active.
      Returns: Boolean. True if an element can be set as active.

    getAnswer () : AnswerType
      Returns the current question's answer.

    showAnswer (div : DOMObject)
      Displays the current question's answer inside the given DOM Object.

    check () : boolean
      Purpose: Checks if the provided answer is correct.
      Arguments: ANY ... All arguments get passed through to the question.
      Returns: Boolean. True if the answer is correct.

    load ()
      Purpose: Runs the Exercise.

    refresh ()
      Draws the question to the screen, replacing any past question.

  TYPE DATA :
    QuestionNumber2D
      questionType  int  The number of the new QuestionType to be set to
      question      int  The number of the new Question to be set to

*/

/*jshint esversion: 6 */ 'use strict';

class ExerciseBase {
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

  setCurrQuestionType(qTypeNum)
  {
    if (qTypeNum < 0)
    {
      console.error("From inside setCurrQuestionType, param is negative.");
      return false;
    } else if (qTypeNum >= this.questionTypes.length)
    {
      console.error("From inside setCurrQuestionType, param is too high.");
      return false;
    }

    var temp = this.currQTypeIndex;
    this.currQTypeIndex = qTypeNum;
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

    var toReturn = {
      questionType : -1,
      question     : -1
    };

    for (var questionType in this.questionTypes)
    {
      if (this.questionTypes[questionType].containsQuestionNum(questionNumber) )
      {
        toReturn.questionType = parseInt(questionType);
        break;
      }
      questionNumber = questionNumber - this.questionTypes[questionType].size();
    }

    if (toReturn.questionType === -1)
    {
      console.error("From inside convertQuestionNumberTo2d, questionNumber is out of bounds (too high).");
      return false;
    }

    toReturn.question = parseInt(questionNumber);

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

    this.setCurrQuestionType(questionNumber2d.questionType);

    this.getCurrQuestionType().setCurrQuestion(questionNumber2d.question);

    this.setAbsQNum (questionNumber);

    this.refresh();
  }

  next ()
  {
    return this.goToQuestion(this.getAbsQNum() + 1);
  }

  prev ()
  {
    return this.goToQuestion(this.getAbsQNum() - 1);
  }

  reset ()
  {
    this.getCurrQuestion().start();
  }

  restart ()
  {
    return this.goToQuestion (this.getAbsQNum ());
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

    var curModel;

    for (var index in questionTypesClassNames)
    {
      var newQType = new questionTypesClassNames[index](questionData[index],
                                             numberOfQuestionsRequired[index],
                                             answerTypesClassNames[index],
                                             curModel);
      this.questionTypes.push(newQType);

      var lastAnswer = newQType.getAnswer (-1);
      curModel = lastAnswer;
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

  check ()
  {
    var qType = this.getCurrQuestionType ();
    return qType.check.apply (qType, arguments);
  }

  load ()
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
