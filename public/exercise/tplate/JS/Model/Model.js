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

  //ANY MODEL NEEDS THE FOLLOWING -
  //equals = null;
  //draw = null;
  //each = null;
  //contains = null;
  //copy     = null;
}
