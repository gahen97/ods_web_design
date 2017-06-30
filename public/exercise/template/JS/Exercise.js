/*jshint esversion: 6 */

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
