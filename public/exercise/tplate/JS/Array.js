/*jshint esversion: 6 */ 'use strict';
/*
  May want to change this but anyway
  Adds some static methods to the Array class:
    scramble (arr)
      Scrambles array arr so that the elements will be in some random order.
        Does this by the ODSRandom class. Note this creates a new Array
        with the scrambled elements
    swap (arr, i, j)
      Swaps array elements at i & j. Note it does this in the same array,
      does not have a return value
*/

Array.swap = function (arr, i, j) {
  var temp = arr [i];
  arr [i]  = arr [j];
  arr [j]  = temp;
};

Array.scramble = function (arr) {
  return ODSRandom.scramble (arr);
};
