var rand = { };

const MAX_ATTEMPTS = 35;
const MAX_INT = Math.pow (2, 32);

rand.between = function (min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

rand.nextInt = function(){
	return rand.between (0, MAX_INT);
}

rand.bool = function(){
	return Math.random () <= 0.5;
}

rand.letter = function(){
	return String.fromCharCode (rand.between (A_ASCII, Z_ASCII));
}

rand.index = function(list){
	return rand.between(0, list.length - 1);
}

rand.elem = function(list){
	return list[rand.index (list)];
}

rand.excluding = function(min, max, wo, opts){
	if (!opts) opts = { };

	var maxAttempts = opts.maxAttempts || MAX_ATTEMPTS;
	var i = 0;	
	while (i < maxAttempts){
		var n = rand.between (min, max);
		if (wo.indexOf (n) === -1)
			return n;
		i++;
	}

	return matchSmallest(min, max, wo);
}
