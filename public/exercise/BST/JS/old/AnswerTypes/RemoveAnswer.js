/*jshint esversion: 6 */ 'use strict';

class RemoveAnswer extends AnswerType {
  constructor()
  {
    console.log ("Hello, world?");
    super();
    this.data = null;
    this.model  = new __MODULENAME__();
    this.model2 = new __MODULENAME__();
  }

  getModel2 () { return this.model2; } // TODO

  check (userAnswer)
  {
    // TODO Find a way to do this in one step? Checks two cases
    return this.model.equals (userAnswer) ||
           this.model2.equals (userAnswer);
  }

  display(div){
    var end = ()=>{
      super.display(div);
    }

    // search for the node
    var path = this.param ("path-to-node");

    // convert path into a node from the actual model
    // which we can then convert into an element
    var actNod = control.findNodeFromPath (path);
    var elem   = control.findElemFrom (actNod);

    if (!elem) return end();

    // animate adding the element
    FadeOut.runAnimation (elem, end, {duration: 600});
  }
}
