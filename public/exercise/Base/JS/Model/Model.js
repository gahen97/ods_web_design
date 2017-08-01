/*jshint esversion: 6 */ 'use strict';

class Model {
  constructor()
  {
  }

  draw()
  {
    var s = ()=>{
      if (!control) console.error("I'm callin' in sick today");
      else control.setModel (this); //TODO
    };

    if (!control){
      setTimeout(s, 0);
      return;
    }else {
      s();
    }

  }

  //ANY MODEL NEEDS THE FOLLOWING -
  //equals = null;
  //draw = null;
  //each = null;
  //contains = null;
  //copy     = null;
}
