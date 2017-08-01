/*jshint esversion: 6 */ 'use strict';

class Size extends TermQuestion {
  generateParameters()
  {
    return ODSRandom.getRandomIntInclusive(__sizeMinParam__, __sizeMaxParam__);
  }
}
