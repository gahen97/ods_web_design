/*jshint esversion: 6 */ 'use strict';

class Depth extends TermQuestion {
  generateParameters()
  {
    return ODSRandom.getRandomIntInclusive(0, this.model.height());
  }
}
