/*jshint esversion: 6 */

class ODSRandom {
  constructor()
  {
  }

   static getRandom()
  {
    return Math.random();
  }

  static getRandomArbitrary(min, max)
  {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  //inclusive min, exclusive max
  static getRandomInt(min, max)
  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  //inclusive max
  static getRandomIntInclusive(min, max)
  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}




class Instructions {
  constructor(instructions)
  {
    this.data = instructions;
  }

  getData()
  {
    return this.data;
  }

  setData(newData)
  {
    var temp = this.data;
    this.data = newData;
    return temp;
  }

  //associates instruction data with html element id
  display(i)
  {
    var instructionElement = $("#" + instructionsId + i);
    instructionElement.text(    instructionElement.text()
                              + this.getData()              );
  }

}





class Answer {
  constructor()
  {
  }
}






class Question {

  constructor(questionData)
  {
    this.answer = questionData.answer || undefined;
    this.parameters = questionData.parameters || { };
    this.instructions = questionData.instruction ? new Instructions(questionData.instruction) : null;
    this.id = Question.nextId++;
  }

  getAnswer()
  {
    return this.answer;
  }

  setAnswer(answer)
  {
    var temp = this.answer;
    this.answer = answer;
    return temp;
  }

  getInstructions()
  {
    return this.instructions;
  }

  displayInstructions()
  {
    this.getInstructions().display();
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

  getId()
  {
    return this.id;
  }

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

  setId(i)
  {
    var temp = this.id;
    this.id = i;
    return temp;
  }
}

Question.nextId = 0;




class DummyQuestion1 extends Question {



}


class DummyQuestion2 extends Question {



}


class DummyQuestion3 extends Question {



}


class QuestionType {
  constructor(questionData)
  {
    this.questions = [ ];
    this.numQuestionsRequired = 0;
    this.setup(questionData);
  }

  getQuestions()
  {
    return this.questions;
  }

  setNumQuestionRequired(n)
  {
    var temp = this.numQuestionsRequired;
    this.numQuestionsRequired = n;
    return temp;
  }

  setup(questionData)
  {
    if (!questionData) {      //param checking
      if (DEBUG) { console.error("From inside QuestionType.setup(), falsy param."); }
      return;
    }

    var thisQuestion = null;
    for (var index in questionData)
    {
      thisQuestion = questionData[index];
      this.questions.push(new thisQuestion.class(thisQuestion));
    }
  }

  //draw = null;

  //check = null;

}


class DummyQuestionType1 extends QuestionType{

  draw(a)
  {
    console.log(a, "I'm drawing1!!");
  }

  check()
  {

  }
}



class DummyQuestionType2 extends QuestionType{

  draw(a)
  {
    console.log(a, "I'm drawing2!!");
  }

  check()
  {

  }
}




class DummyQuestionType3 extends QuestionType{

  draw(a)
  {
    console.log(a, "I'm drawing3!!");
  }

  check()
  {

  }
}



var DEBUG = true;
var instructionsId = "instructions";

/*

var __MODULENAME__questionTypesClassNames = [];

  var __MODULENAME__questionData = [ {className : questionClassName, instructionsText : "do this" , parameters : {} } , ]
  //model
  var __MODULENAME__ = "";

var __MODULENAME__numberOfQuestionsRequired = [ ];
*/

var questionTypesClassNames = [DummyQuestionType1, DummyQuestionType2, DummyQuestionType3];

  var questionData = [                [{class : DummyQuestion1, instructionsText : "do this1" , parameters : {randomNumber : ODSRandom.getRandomIntInclusive(1,10)}}] ,
                                      [{class : DummyQuestion2, instructionsText : "do this2" , parameters : {randomNumber : ODSRandom.getRandomIntInclusive(1,10)}}] ,
                                      [{class : DummyQuestion3, instructionsText : "do this3" , parameters : {randomNumber : ODSRandom.getRandomIntInclusive(1,10)}}] ];
  //model
  //var __MODULENAME__ = DUMMY;

var numberOfQuestionsRequired = [1,1,3];


/*load order:
MUST BE LOADED AFTER QUESTIONS AND QUESTIONTYPES AND RANDOM
AND BEFORE EXERCISE
*/



class Exercise {
  constructor()
  {
    //array of question types
    this.questionTypes = [ ];
  }

  getQuestionTypes()
  {
    return this.questionTypes;
  }

  setQuestionTypes(toSet)
  {
    var temp = this.questionTypes;
    this.questionTypes = toSet;
    return temp;
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
      this.questionTypes.push(new questionTypesClassNames[index](questionData[index]));
    }


  }
}

var exercise = new Exercise();

exercise.setup();
