/*
  Contains helper functions for dealing with divs:
    - Is a position inside the div?
    - Get a random position within the div
    - ???

  TODO layout could probably be improved here
*/

class Div {
  // static helper functions
  // rectangular
  static dimensionsOf ($div) {
    // note ... expects a JQuery object, if it's not, this'll error
    return {
      xP     : $div.offset ().left,
      yP     : $div.offset ().top,
      width  : $div.outerWidth (),
      height : $div.outerHeight ()
    };
  }

  static intersects (x, y, div) {
    var dimensions = Div.dimensionsOf (div);
    return (x >= dimensions.xP && x <= dimensions.xP + dimensions.width)
          && (y >= dimensions.yP && y <= dimensions.yP + dimensions.height);
  }

  static randomPositionWithin (div) {
    var dimensions = this.dimensionsOf (div);
    return {
      left: ODSRandom.getRandomIntInclusive (dimensions.xP, dimensions.xP + dimensions.width),
      top: ODSRandom.getRandomIntInclusive (dimensions.yP, dimensions.yP + dimensions.height)
    }
  }

  // round
  static dimensionsOfRound (div) {
  	var dimensions = Div.dimensionsOf (div);
  	return {
  		xP: dimensions.xP + dimensions.width/2,
  		yP: dimensions.yP + dimensions.height/2,
  		rx: dimensions.width / 2,
  		ry: dimensions.height / 2
  	};
  }

  static intersectsRound (x, y, div) {
    var dimensions = Div.dimensionsOfRound (div);

    var xp = ( (x - dimensions.xP) * (x - dimensions.xP) ) / (dimensions.rx * dimensions.rx);
    var yp = ( (y - dimensions.yP) * (y - dimensions.yP) ) / (dimensions.ry * dimensions.ry);

    return xp + yp <= 1;
  }

  static randomPositionWithinRound (div) {
    // https://stackoverflow.com/questions/5529148/algorithm-calculate-pseudo-random-point-inside-an-ellipse
    var dimensions = this.dimensionsOfRound (div);
    var phi        = ODSRandom.getRandomMinMax (0, 2 * Math.PI);
    var rho        = ODSRandom.getRandom ();
    var rhosqrt    = Math.sqrt (rho);

    var x          = rhosqrt * Math.cos (phi);
    var y          = rhosqrt * Math.sin (phi);

    // TODO: Change 50. Make it an option or something.
    // For now, just an offset so it doesn't go on the border of the ellipse
    return {
      left: (x * (dimensions.rx - 50)) + dimensions.xP,
      top: (y * (dimensions.ry - 50)) + dimensions.yP
    };
  }


  /* methods */
  constructor (div) {
    this.myDiv = div;
    this.$div  = $(div);

    this.originalData = Div.dimensionsOf (this.$div);
    this.proportionRatio = parseInt (this.originalData.height) /
                           parseInt (this.originalData.width);
  }

  getDimensions () {
    if (this.$div.hasClass ("round"))
      return Div.dimensionsOfRound (this.myDiv);
    return Div.dimensionsOf (this.myDiv);
  }

  intersects (x, y) {
    if (this.$div.hasClass ("round"))
      return Div.intersectsRound (x, y, this.myDiv);
    return Div.intersects (x, y, this.myDiv);
  }

  randomPosition () {
    if (this.$div.hasClass ("round"))
      return Div.randomPositionWithinRound (this.myDiv);
    return Div.randomPositionWithin (this.myDiv);
  }

  elementOver (element) {
    var pos = $(element).offset ();
    return this.intersects (pos.left, pos.top);
  }

  calcHeight (newWidth) {
    if (!newWidth && newWidth !== 0)
      newWidth = parseInt (Div.dimensionsOf (this.$div).width);
    var newHeight = newWidth * this.proportionRatio;

    return newHeight;
  }

  fixHeight () {
    this.$div.css ("height", this.calcHeight ());
  }

  storePosition (element) {
    var divPos = Div.dimensionsOf (element);
    var myDims = Div.dimensionsOf (this.$div);

    // store %width, %height
    var pWidth  = (divPos.xP - myDims.xP) / myDims.width;
    var pHeight = (divPos.yP - myDims.yP) / myDims.height;

    element.data ("%width", pWidth);
    element.data ("%height", pHeight);
  }

  fixPosition (element) {
    var pX = element.data ("%width");
    var pY = element.data ("%height");

    var myDimensions = Div.dimensionsOf (this.$div);

    var newX = pX * myDimensions.width + myDimensions.xP;
    var newY = pY * myDimensions.height + myDimensions.yP;

    element.css ({top: newY, left: newX});
  }

  storePositions (elements) {
    for (var e in elements)
      this.storePosition (elements [e]);
  }

  fixPositions (elements) {
    // If we store % of width, % of height ... then we can reset that ...
    for (var e in elements)
      this.fixPosition (elements [e]);
  }
}
