/*jshint esversion: 6 */ 'use strict';

class FindAnswer extends AnswerType {
  constructor()
  {
    super();
    this.data = null;
    this.model = new __MODULENAME__();
  }

  check (userAnswer) {
    // if not given an answer, is wrong.
    if (!userAnswer) return false;

    // if not enough / too many nodes in answer, is wrong.
    if (userAnswer.length !== this.data.length) return false;

    // every node must match ...
    for (var i in this.data) {
      if (!userAnswer [i]) return false;
      if (this.data [i].data !== userAnswer [i].data) return false;
    }

    return true;
  }

  displayAnimation (elements, currentIndex)
  {
    // this animation is where ITS AT.
    /* ******* ****** ***** ***** **** ****** ******** ****** ****   *
       *    The way I see this working:                              *
       *    At any given index, we have two elements, a & b.         *
       *      a is connected to b by JsPlumb.                        *
       *      Our answer should move through each of these           *
       *      connections, lighting them up as it goes through,      *
       *      like a lightning bolt. It should be styled by CSS      *
       *      and be a small div, 1x1, moving through the page.      *
       *                                                             *
       *   This requires MATH. I like math. Math is gud.             *
       *                                                             *
       ******* ****** ***** ***** **** ****** ******** ****** ****   */


  }
  display()      //TODO replace with production version
  {
    control.disable ();

    var elements = control.getElementsFromNodes (this.data);
    if (!elements) return false;

    this.displayAnimation (elements, 0);

    control.enable ();
  }
}
