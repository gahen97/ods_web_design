/*
  This glows the text on an element by changing its text color.

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
*/

/*jshint esversion: 6 */ 'use strict';

class Glow {
  static runAnimation (element, opts) {
    if (!opts) opts={};

    // determines if element is a DOM object
    if (element.nodeType === 1) element = $(element);

    element.addClass ("text-highlight");

    /*Animation.run ("class-fade-in", element, {
      class: "text-highlight",
      duration: opts.duration / 2,
      callback: ()=>{
        setTimeout(()=>{*/
          Glow._endAnim (element, opts);
    /*    }, 100);
      }
    });*/
  }

  static _endAnim (element, opts) {
    if (!opts) opts = { };

    Animation.run ("class-fade-in", element, {
      class: "",
      remClass: "text-highlight",
      duration: opts.duration,
      callback: opts.callback
    });
  }
}
