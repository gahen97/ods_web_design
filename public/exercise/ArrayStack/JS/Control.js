/*jshint esversion: 6 */ 'use strict';

class Control extends ControlBase {
  constructor()
  {
    super();
  }

  // remove an element
  removeElement (e)
  {
    // remove from the user model
    this.userModel.remove (value);

    super.removeElement (e);
  }

  // find element at given index
  findIndex (index) {
    return this.view.findAtIndex (index);
  }

  updateIndex (eDiv, prevIndex, newIndex){
    this.userModel.update (prevIndex, newIndex);
    this.view.updateIndex (prevIndex, newIndex);
  }
}
