/*
  This runs JQueryUI's show animation with a given effect.

  Documentation:
    static runAnimation (element : DOMObject, opts : Options)
      Purpose: Runs the animation
      Arguments:
        element  DOMObject  The element to run the animation on
        opts     Options    Options for the animation. See Options below
      Returns: None

    Options
      duration  number    The length of time for the animation to run
      callback  function  The function to call after the animation ends
      effect    string    The effect to run. See https://jqueryui.com/show/
      options   Object    Options to pass into JQueryUI's effect animation.
*/

/*jshint esversion: 6 */ 'use strict';

class Show {
  static runAnimation (element, opts) {
    if (!opts) opts={};

    // determines if element is a DOM object
    if (element.nodeType === 1) element = $(element);

  //console.log (element.is (":animated"));
    //if (!element.is(":animated"))
    /*  element.effect({
        effect: opts.effect,
        duration: opts.duration,
        easing: opts.easing,
        queue: false,
        done: opts.callback
      });*/

    // if no elements, skiparoo
    if (element.length === 0 && opts.callback)
      opts.callback();

    element.effect (
      opts.effect,
      opts.options,
      opts.duration,
      opts.callback
    )
  }
}
