class JsPlumbEndpoint extends PlumbEndpoint {
  constructor(){
    super(...arguments);
  }

  // handle giving the side data
  drawEndpoint (element, o, s, d) {
    var ep = super.drawEndpoint (element, o, d);

    // add the side (left or right) for the endpoint
    var $cv = $(ep.canvas);
    $ (ep.element).data ("side", s);
    $cv.data ("side", s);

    return ep;
  }
}
