/*jshint esversion: 6 */ 'use strict';

class Depth extends TermQuestion {
  generateParameters()
  {
    return ODSRandom.getRandomIntInclusive(__depthMinParam__, __depthMaxParam__);
  }
}
