/*jshint esversion: 6 */ 'use strict';

class Terminology extends QuestionType{
  build()
  {
    var model = new __MODULENAME__();
    for (var i = 0; i < NUM_STARTING_ADDITIONS; i++)
      model.add (ODSRandom.getRandomIntInclusive (MIN_PREADD, MAX_PREADD));
    return model;
  }
}
