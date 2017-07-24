/*jshint esversion: 6 */ 'use strict';

class RemoveAnswer extends AnswerType {
  constructor()
  {
    super();
    this.data = null;
    this.model = new __MODULENAME__();
  }

  check (userAnswer)
  {
    return this.model.equals (userAnswer);
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
    Animation.run ("FadeOut", elem, {
      callback: end
    });
  }
}
