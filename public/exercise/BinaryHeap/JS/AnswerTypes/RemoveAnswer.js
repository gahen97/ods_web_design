/*jshint esversion: 6 */ 'use strict';

class RemoveAnswer extends AnswerType {
  constructor()
  {
    super();
    this.data = null;
    this.model = new __MODULENAME__();
    this.model2 = new __MODULENAME__(); // TODO Find better way to deal with this case : greatest element lesser than node
  }

  getM2 () { return this.model2; }

  setModel (m) {
    this.model2 = m.copy();
    return super.setModel (m);
  }
  
  check (userAnswer)
  {
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
    Animation.run ("FadeOut", elem, {
      callback: end
    });
  }
}
