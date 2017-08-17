/*
	Generate a random Skiplist to use with the Skiplist exercise.
*/

var modules   = "./Skiplist";
var Skiplist  = require(modules + "/Skiplist.js");
var Random    = require ("./helpers/random.js");

function generateRand (){
	return Random.between (0, 99);
}

function generateNs (numNs) {
	var numbers = [ ];
	for (var i = 0; i < numNs; i++){
		var n;
		do {
			n = generateRand ();
		} while (numbers.indexOf (n) !== -1);

		numbers.push (n);
	}

	return numbers.sort((a,b)=>{return a-b;});
}

function SkiplistExercise (){
	return new Skiplist(generateNs (6)).toJson ();
}

module.exports.create = SkiplistExercise;
