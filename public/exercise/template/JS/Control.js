/*jshint esversion: 6 */

class Control {
  constructor()
  {
    this.eventHandler = new CustomEventHandler();
    this.view = new View(this.eventHandler);
    //this.exercise = new Exercise(__MODULENAME__questionData);    //QUESTION
  }

  setup()
  {
    this.exercise.setup();
  }

  run()
  {

    //inserting text for instructions
    var questionKeys = keys(this.exercise.questions)

    //control tells view to "do instructions"
    //view tells instructions to insert themselves



    //TODO specify questions

    this.exercise.displayInstructions(questions);




    //select some questions
    //get some answers

    //draw maybe?
    this.view.draw()
    //listens for user input
  }


  bindEvent(event, handler)
  {
    this.view.bindEvent(event, handler);
  }

  onLMBDOWN(domElement){  }
  onLMBUP(domElement){  }
  onMouseOverON(domElement){  }
  onMouseOverOFF(domElement){  }

  setup(classnamesArr)
  {

    for (i in classnamesArr) {
      new window[classnamesArr[i]];
    }
    this.exercise.setup();
    /*
    this.exercise.setQuestionType([new Operations(20),
    new Terms (20),
    new Something (10)])
    e.g. data */
  }
}
