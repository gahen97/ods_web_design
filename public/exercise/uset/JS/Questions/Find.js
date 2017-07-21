/*jshint esversion: 6 */ 'use strict';

class Find extends Question {
  generateParameters()
  {
    return ODSRandom.getRandomIntInclusive(__findMinParam__, __findMaxParam__);
  }

  computeAnswerData()
  {
    return this.answer.getModel().find(this.parameters);
  }

  getAnswer ()
  {
    return this.answer.getData ();
  }

  // check answer ...
  //TODO I don't think this should be here, but I probably don't fully understand it.
  // You're right ... belongs inside Element, probably. I'm moving it.

  check (userModel, activeElem)
  {
    // for find, two things must be the same:
    //   1) The models should be the same
    //   2) The return values should match.
    // That is, should find the element without messing with the set.
    if (!activeElem) return false;
    if (!this.answer.getModel ().equals (userModel))
      return false;

    return (this.answer.getData () === activeElem.getObjValue ()); // TODO better name for this?
  }

  // setting active
  canSetActive(){ return true; }

  // input: no input needed for find

  displayAnswer(div){
    // find the element
    var elem = this.answer.findElement ();

    // fade out anything else currently active
    var active = $(".active").not (elem.jq);
    Animation.run ("ClassFadeIn", active, {
      remClass: "active"
    });

    // Fade in the new active
    Animation.run ("ClassFadeIn", elem, {
      class: "active",
      callback: ()=>{
        super.displayAnswer(div);
      }
    });
  }
}
