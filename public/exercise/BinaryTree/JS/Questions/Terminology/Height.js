/*jshint esversion: 6 */ 'use strict';

class Height extends TermQuestion {
  generateParameters()
  {
    return ODSRandom.getRandomIntInclusive(0, this.model.height());
  }
}
