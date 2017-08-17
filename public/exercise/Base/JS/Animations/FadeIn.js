/*
  This fades an element in.

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
      each      function  The function to call for each step of the animation
*/

/*jshint esversion: 6 */ 'use strict';

class FadeIn {
  static runAnimation (element, opts) {
    if (!opts) opts={};

    // determines if element is a DOM object
    if (element.nodeType === 1) element = $(element);

    element.stop();
    element.css({display: 'none'});
    element.fadeIn({
      duration: opts.duration,
      queue: false,
      progress: opts.each,
      done: opts.callback
    });
  }
}
