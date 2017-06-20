var mousein = false;
$("#block").mouseenter(function(){mousein=true;});
$("#block").mouseleave(function(){mousein=false;});

var drawinblock = function(p) {
	var coef = 0;
	//Math.floor(Math.random() * (160 - 100)) + 100;

	p.setup = function() {
		p.createCanvas(300, 300);
	}

	p.draw = function() {
		p.background(244);


		if(((p.mouseX/p.width) <= 0.7) && ((p.mouseX/p.width) >= 0))
			coef = p.mouseX/p.width;

		//p.stroke(250, 214, 14); //yellow
		p.stroke(239, 128, 67); //orange
		//p.stroke(143, 205, 184); //blue
		//p.stroke(81);
		p.strokeWeight(5);
		p.translate(p.width/2, p.height);
		p.tree(100, 6);
	}


	p.mouseClicked = function() {
		p.noLoop();
	}

	p.tree = function(length, steps) {
		p.line(0, 0, 0, -length);
		p.translate(0, -length);

		if(steps > 0) {
			var bcoef = 0.4;

			p.push();
			p.rotate(bcoef);

			if (steps == 6 || steps == 5 || steps == 4)
				p.stroke(250, 214, 14); //yellow
			else
				p.stroke(143, 205, 184); //blue

			p.tree(length*coef, steps-1);
			p.pop();

			p.push();
			p.rotate(-bcoef);

			if (steps == 6 || steps == 5 || steps == 4)
				p.stroke(250, 214, 14); //yellow
			else
				p.stroke(143, 205, 184); //blue

			//p.stroke(143, 205, 184); //blue
			//p.stroke(250, 214, 14); //yellow
			//p.stroke(239, 128, 67); //orange
			p.tree(length*coef, steps-1);
			p.pop();
		}
	}
}

var draw = new p5(drawinblock, "block");
