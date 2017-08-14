/*
  This fades a class in.

  Documentation:
    static runAnimation (element : DOMObject, opts : Options)
      Purpose: Fades a class in for the given element.
      Arguments:
        element  DOMObject  The element to run the animation on
        opts     Options    Options for the animation. See Options below
      Returns: None

    Options
      remClass  string    The class to animate removing from the element
      class     string    The class to animate adding to the element
      duration  number    The length of time for the animation to run
      callback  function  The function to call after the animation ends
*/
/*jshint esversion: 6 */ 'use strict';

class ClassFadeIn {
  static runAnimation (element, opts) {
    if (!opts) opts={};

    // determines if element is a DOM object
    if (element.nodeType === 1) element = $(element);

    element.stop();
    element.switchClass
      (opts.remClass || "",
      opts.class,
       {
         duration: opts.duration,
         complete: opts.callback,
         queue: false
       });
  }
}
