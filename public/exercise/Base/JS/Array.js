/*jshint esversion: 6 */ 'use strict';
/*
  May want to change this but anyway
  Adds some static methods to the Array class:
    scramble (arr : Array) : Array
      Purpose: Scrambles the elements of the given array.
      Arguments:
        arr  Array  Array to scramble the elements of
      Returns: New array containing all elements of arr in a random order.
    swap (arr : Array, i : int, j : int)
      Purpose: Swaps elements i & j within the array.
      Arguments:
        arr  Array  Array to swap elements of
        i    int    First index
        j    int    Second index
      Returns: None. Will perform swap on the array itself.
*/

/*jshint esversion: 6 */ 'use strict';

Array.swap = function (arr, i, j) {
  var temp = arr [i];
  arr [i]  = arr [j];
  arr [j]  = temp;
};

Array.scramble = function (arr) {
  return ODSRandom.scramble (arr);
};
