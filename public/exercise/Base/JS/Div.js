/*
  Controls dealing with HTML Elements.

  Documentation:
    constructor (div : DOMObject)
      Takes the div element to base operations on.

    CALLED FROM A STATIC CONTEXT
      dimensionsOf (div : DOMObject) : Dimensions
        Purpose: Determines the dimensions of a given element along with its position.
        Arguments:
          div  DOM Object  The object to determine the dimensions of
        Returns: An object with dimension data:
          xP      The left position of the element
          yP      The top position of the element
          width   The width of the element
          height  The height of the element

      intersects (x : number, y : number, div : DOMObject) : boolean
        Purpose: Determines if a given x,y is within the dimensions of the element.
        Arguments:
          x    Number      X Position to check
          y    Number      Y Position to check
          div  DOM Object  The DOM Element to check against
        Returns: Boolean. True if the (x,y) is within the dimensions of the div.

      randomPositionWithin (div : DOMObject) : Offset
        Purpose: Returns a random position within the given element.
        Arguments:
          div  DOM Object  The DOM Object to find a random position within
        Returns: An object of position data:
          left  number  Left coordinate
          top   number  Top coordinate

      dimensionsOfRound (div : DOMObject) : DimensionsRound
        Purpose: Determines the dimensions of a given element (which is circular).
        Arguments:
          div  DOM Object  The element to determine the dimensions of
        Returns: An object containing dimension data.
          xP  number  The starting x coordinate of the element (left)
          yP  number  The starting y coordinate of the element (top)
          rX  number  The radius of the element, left to right (based on width)
          rY  number  The radius of the element, top to bottom (based on height)

      intersectsRound (x : number, y : number, div : DOMObject) : boolean
        Purpose: Determines if a given (x,y) position is within the given element,
                   where the element is circular.
        Arguments:
          x    number      The x coordinate to check
          y    number      The y coordinate to check
          div  DOM Object  The DOM Element to check against
        Returns: Boolean. True if the given (x,y) coordinates are within the element.

      randomPositionWithinRound (div : DOMObject) : Offset
        Purpose: Returns a random position within the given element, where the
                   element is circular.
        Arguments:
         div  DOM Object  The DOM Object to find a random position within
       Returns: An object of position data:
         left  number  Left coordinate
         top   number  Top coordinate

      positionFromPercentage (div : DOMObject, percentage: PercentObject) : Offset
        Purpose: Returns a position based on a given percentage of the DOM Element.
        Arguments:
          div         DOM Object  The element to find the position within
          percentage  P Object    The percentage data for (x, y)
            x   Percentage of X
            y   Percentage of Y
        Returns: The calculated position {top: X, left: Y}

      fromOffset (div : DOMObject, offset : Offset) : Offset
        Purpose: Returns the given offset, offset from the top-left corner of the div.
        Arguments:
          div     DOM Object  The element to offset from
          offset  Offset      The offset to base off of
            top   Offset from the top of the div
            left  Offset from the left of the div
        Returns: New Offset {top: Y, left: X} combining div & offset data

    CALLED FROM AN INSTANCE
      getDimensions () : Dimensions
        Purpose: Calculates the dimensions of the element.
        Arguments: None
        Returns: DEPENDENT ON THE ELEMENT
          Will return results of either getDimensions(div) or
                                        getDimensionsRound (div)

      intersects (x : number, y : number) : boolean
        Purpose: Determines if given (x,y) coordinates are within the element.
        Arguments:
          x  number  X position
          y  number  Y position
        Returns: Boolean. True if the coordinates are within the element.

      randomPosition () : Offset
        Returns: A random position within the div.

      fromPercentage (percentage : PercentObject) : Offset
        Purpose: returns a position based on a percentage of the div.
        Arguments:
          percentage  P Object    The percentage data for (x, y)
            x   Percentage of X
            y   Percentage of Y
        Returns: The coordinates {top: Y, left : X} representing the given
                   percentage of the element.

      fromOffset (os : Offset) : Offset
        Purpose: Calculates a position based on a given offset.
        Arguments:
          offset  Offset      The offset to base off of
            top   Offset from the top of the div
            left  Offset from the left of the div
        Returns: New Offset {top: Y, left: X}

      elementOver (e : DOMObject) : boolean
        Purpose: Determines if a given DOM Object e is over the element.
        Arguments:
          e  DOM Object  Object to check if within/over our element
        Returns: Boolean. True if the element is over our element.

      calcHeight (width : number) : number
        Returns: A height value based on a pre-calculated percentage of width.

      setHeight (h : number)
        Purpose: Sets element height to the given height.
        Arguments:
          h  number  The new height to set for the element.
        Returns: None

      fixHeight ()
        Purpose: Resets height based on current width of the element.

      storePosition (element : DOMObject)
        Purpose: Stores position of element against our div to be referenced.
        Arguments:
          element  DOM Object  Element to store the position of
        Returns: None

      fixPosition (element : DOMObject)
        Purpose: Fixes coordinates of elements based on our stored values.
        Arguments:
          element  DOM Object  Element to fix the position of
        Returns: None.

      storePositions (elements : Array of DOM Object)
        Purpose: Stores positions of all elements within the elements array.
        Arguments:
          elements  Array  Elements to store the position of
        Returns: None

      fixPositions (elements : Array of DOM Object)
        Purpose: Fixes coordinates of all elements within the elements array.
        Arguments:
          elements  Array  Elements to fix the position of
        Returns: None
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

  static positionFromPercentage (div, percentage) {
    var dimensions = this.dimensionsOf (div);
    var xOs        = dimensions.width * percentage.x;
    var yOs        = dimensions.height * percentage.y;

    return {
      top : yOs + dimensions.yP,
      left : xOs + dimensions.xP
    }
  };

  static fromOffset (div, offset){
    var dimensions = this.dimensionsOf (div);
    return {
      top: dimensions.yP + offset.top,
      left: dimensions.xP + offset.left
    }
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

  fromPercentage (p) {
    return Div.positionFromPercentage (this.$div, p);
  }

  fromOffset (os) {
    return Div.fromOffset(this.$div, os);
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

  setHeight (h) {
    this.$div.height (h);
    this.calcHeight ();
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
