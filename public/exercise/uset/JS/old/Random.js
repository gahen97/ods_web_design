/*jshint esversion: 6 */ 'use strict';

class ODSRandom {
  constructor()
  {
    this.savedRNGs = [ ];
  }

   static getRandom()
  {
    return Math.random();
  }

  static getRandomMinMax (min, max)
  {
    return (ODSRandom.getRandom () * (max - min)) + min;
  }

  getRandom()
 {
   return this.addToSavedRNGs(ODSRandom.getRandom());
 }

 getRandomMinMax (min, max) {
   return this.addToSavedRNGs (ODSRandom.getRandomMinMax (min, max));
 }

  static getRandomArbitrary(min, max)
  {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getRandomArbitrary(min, max)
  {
    return this.addToSavedRNGs(ODSRandom.getRandomArbitrary(min, max));
  }

  //inclusive min, exclusive max
  static getRandomInt(min, max)
  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

   getRandomInt(min, max)
  {
    return this.addToSavedRNGs(ODSRandom.getRandomInt(min, max));
  }


  //inclusive max
  static getRandomIntInclusive(min, max)
  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomIntInclusive(min, max)
  {
    return this.addToSavedRNGs(ODSRandom.getRandomIntInclusive(min, max));
  }

  //get random from list
  static getRandomFromArray(arr)
  {
    return arr[ODSRandom.getRandomIntInclusive(0,arr.length-1)];
  }

  getRandomFromSaved()
  {
    return ODSRandom.getRandomFromArray(this.savedRNGs);
  }

  static scramble (array) {
    // should we clone the array, then randomize? or randomize same array?
    // since we're returning, let's clone first.
    // NOTE: https://stackoverflow.com/questions/3978492/javascript-fastest-way-to-duplicate-an-array-slice-vs-for-loop
    // Different speeds based on method chosen, which then depends on browser ... blahblahblah. Using slice for now.
    array = array.slice (0);

    // loop over & randomize each position
    for (var i = array.length - 1; i > 0; i--) {
      var j = this.getRandomIntInclusive(0, i);
      Array.swap (array, i, j);
    }

    return array;
  }

  addToSavedRNGs(i)
  {
    this.savedRNGs.push(i);
    return i;
  }
}
