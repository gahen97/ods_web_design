/*
  Main object for dealing with Random numbers within the exercises.

  Documentation:
    constructor()
      Takes no arguments. Can be used to store generated numbers
        and pull from a pool of previous numbers.

    CALLED ON EITHER STATIC OR INSTANCE
      getRandom ()
        Returns: Random number [0, 1)
      getRandomMinMax (min : number, max : number)
        Returns: Random number [min, max)
      getRandomArbritrary (min : int, max : int)
        Returns: Random integer [min, max)
      getRandomInt (min : int, max : int)
        Returns: Random integer [min, max)
      getRandomIntInclusive (min : int, max : int)
        Returns: Random integer [min, max]
      getRandomFromArray (arr : Array)
        Returns: Random element e from arr
      scramble (arr : Array)
        Returns: New array arr2 with all elements of arr in a random order.

    IF CALLED ON INSTANCE ONLY
      getRandomFromSaved ()
        Returns: Random number chosen from previously generated random numbers

*/

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
    // Clones the array first to make changes to a new one
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
