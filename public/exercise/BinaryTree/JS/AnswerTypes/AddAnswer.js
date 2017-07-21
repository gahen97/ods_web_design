/*jshint esversion: 6 */ 'use strict';

class AddAnswer extends AnswerType {
  constructor()
  {
    super();
    this.data = false;
    this.model = new __MODULENAME__();
  }

  check (userAnswer)
  {
    return this.model.equals (userAnswer);
  }

  display(div){
    super.display(div);

    // search for the node
    var nodeId = this.param ("nodeId");
    var node   = this.model.findId (nodeId);
    if (!node) return;

    // if it was found, find the path to it
    var path   = this.model.pathTo (node.data);

    // convert path into a node from the actual model
    // which we can then convert into an element
    var actNod = control.findNodeFromPath (path);
    var elem   = control.findElemFrom (actNod);

    // animate adding the element
    Animation.run ("FadeIn", elem);
  }
}
