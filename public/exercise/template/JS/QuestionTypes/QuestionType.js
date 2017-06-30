/*jshint esversion: 6 */

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
    for (index in questionData)
    {
      thisQuestion = questionData[index];
      this.questions.push(new thisQuestion.class(thisQuestion));
    }
  }

  //draw = null;

  //check = null;

}
