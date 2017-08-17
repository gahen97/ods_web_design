/*
  This traverses a path of an array of elements, animating the path.

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

class Traverse {
  static runAnimation (elements, options){
    if (!options) options = { };

    var myElement = this.makeElement ();
    var duration  = this.determineDuration (options.duration, elements.length);

    options.duration = duration;

    if (options.each) options.each (elements [0], 0);

    var clean = ()=>{ myElement.remove (); }
    this.animationCtrl (myElement, elements, options, 1).then (options.callback)
        .then (clean, clean);
  }

  // Make a new element
  static makeElement () {
    return $("<div id='animationDiv'></div>").appendTo ($ (QUESTION_MAIN));
  }

  // Determine the duration for each step of the algorithm,
  //  to move between two adjacent elements.
  static determineDuration (fromDur, numElements) {
    // TODO find a better way to do this
    return fromDur * 0.75;
  }

  // Main controller for the animation. Directs the element through each
  //   element in the array.
  static animationCtrl (myElem, elements, options, currentIndex) {
    return new Promise ((fulfill, reject) => {
      if (currentIndex >= elements.length) fulfill ();
      else{
        // Find the divs for each element
        var e1 = elements [currentIndex - 1];
        var e2 = elements [currentIndex];

        if (!e1 || !e2) return reject();

        var d1 = e1.divToNext (e2)
        var d2 = e2.div;

        // Calculate the path we have to take
        var positionData = this.calcPath (d1, d2);

        if (currentIndex <= 1)
          $(myElem).offset (positionData.startPosition);

        // Take the path
        this.animateStep (myElem, positionData, {
          duration: options.duration,
          callback: ()=>{
            if (options.each)
              options.each (elements [currentIndex], currentIndex);

            return this.animationCtrl (myElem, elements,
                                       options, currentIndex + 1)
                       .then(fulfill, reject);
          }
        });
      }
    });
  }

  // Animate moving between one object to another
  static runStep (element, properties, data) {
    var props = {
      left: "+=" + (properties.endPosition.left - properties.startPosition.left) + "px",
      top:  "+=" + (properties.endPosition.top  - properties.startPosition.top) + "px"
    }
    // hacky.
    $ (element).animate (props,
      {
        duration: data.duration,
        progress: data.each,
        complete: data.callback
      });
  }

  static animateStep (element, properties, data) {
    // animate moving to the next start position
    properties.startPosition = $(element).offset();
    this.runStep (element, properties, data);
  }

  // Calculate the path to be taken to move from one element to another
  static calcPath (fromDiv, toDiv)
  {
    // Compute dimensions, positions
    var d1 = Div.dimensionsOf (fromDiv);
    var d2 = Div.dimensionsOf (toDiv);

    // Move between the center of each of these divs
    var x1 = d1.xP + d1.width / 2;
    var y1 = d1.yP + d1.height / 2;
    var x2 = d2.xP + d2.width / 2;
    var y2 = d2.yP + d2.height / 2;

    // And now we have the start and end positions.
    return {
      startPosition: {
        left: x1,
        top:  y1
      },
      endPosition: {
        left: x2,
        top:  y2
      }
    }
  }
}
