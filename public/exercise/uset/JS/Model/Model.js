/*jshint esversion: 6 */ 'use strict';

class Model {
  constructor()
  {
  }

  draw()
  {
    if (!control){
      console.error ("From Model.Draw(), control is null...");
      return;
    }

    control.setModel (this); //TODO
  }
  //equals = null;
  //draw = null;
}
