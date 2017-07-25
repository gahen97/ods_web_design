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
}
