/*jshint esversion: 6 */ 'use strict';

class GetAnswer extends AnswerType {
  constructor()
  {
    super();
    this.data = null;
    this.model = new __MODULENAME__();
  }

  set index (i) { this.i = i; }
  get index ()  { return this.i; }

  check (userModel, active, path) {
    // if not given an answer, is wrong.
    if (!userModel) return false;

    var pathToNode = userModel.pathTo (this.index);
    if (pathToNode.length !== path.length) return false;

    for (var i in path)
      if (path [i].id !== pathToNode [i].id)
        return false;
    return true;
  }

  display()      //TODO replace with production version
  {
    control.disable ();
    control.restartExercise ();
    
    var elements = control.getElementsForRoute (this.index); // TODO implement
    if (!elements) return false;

    // TODO should be something better here maybe
    control.reset ();

    Animation.run ("Traverse", elements, {
      callback: ()=>{
        control.enable ();
      },
      each: (elem)=>{
        if (!control.disabled)
          return false;
        control.setActiveElement (elem);
      }
    });
  }
}
