/*
  Handles the overlay which is created to block all input to the exercise.

  Documentation:
    constructor (div)
      Div to append the overlay to. The overlay will cover up the provided div
    enable ()
      Purpose: Enables all input to the div.
    disable ()
      Purpose: Disables all input to the div.
*/

/*jshint esversion: 6 */ 'use strict';

class Overlay {
  static create () {
    return $("<div class='overlay'></div>");
  }

  constructor (div) {
    this.div  = div;
    this.$div = $(div);
    this.overlay = Overlay.create ();
  }

  disable () {
    this.overlay.appendTo (this.$div);
  }

  enable () {
    this.overlay.remove ();
  }
}
