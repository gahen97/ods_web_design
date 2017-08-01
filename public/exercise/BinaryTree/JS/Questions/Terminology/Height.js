/*jshint esversion: 6 */ 'use strict';

class Height extends TermQuestion {
  generateParameters()
  {
    return ODSRandom.getRandomIntInclusive(__heightMinParam__, __heightMaxParam__);
  }
}
