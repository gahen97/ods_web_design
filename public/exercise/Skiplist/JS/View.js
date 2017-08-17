/*
  This is the main View class which will be used for dealing with all UI elements.

  Documentation:
    constructor ()
      Constructs a new View object.
    isElementOverModel (element : DOMObject) : boolean
      Purpose: Determines if an element is within the model's view.
      Arguments:
        element  DOMObject  The DOM Object to check
      Returns: Boolean. True if the element is within the model.
    drawWithinModel (element : Element)
      Purpose: Draws an element within the model's view.
      Arguments:
        element  Element  The element to draw within the model.
      Returns: None
    displayModel (m : Model)
      Purpose: Draws the model to the screen.
      Arguments:
        m  Model  The model to display
      Returns: None

  See ViewBase for further documentation
*/

class View extends ViewBase {
  constructor(){
    super(...arguments);

    this.nodes = [ ];
  }

  // Is an element in the model
  isElementOverModel (element) {
    // NTS: Element here is the div
    return this.modelDivHelper.elementOver (element);
  }

  // draw an element within the model
  drawWithinModel (element) {
    var pos = this.modelDivHelper.randomPosition ();
    element.moveTo (pos);
  }

  displayModel (m) {
    var x      = ELEMENT_X_START;
    var height = m.height;
    m.each ((data,node, index)=>{
      this.nodes [node.id] = [ ];
      for (var row = 0; row < node.height; row++){
        var e = this.addElement (data, {
          constructArgs: {
            nodeId:   node.id,
            rowIndex: row
          }
        });

        e.moveTo (this.modelDivHelper.fromOffset ({
          top: ELEMENT_SEP_Y * (height - row),
          left: x
        }));

        if (row > 0)
          e.hideValue ();

        var prevNode = node.getPrev (row);
            prevNode = prevNode && prevNode.id;
        var element  = this.nodes [prevNode] && this.nodes [prevNode] [row];

        console.log (this.nodes [prevNode], row);

        if (element)
          element.connectTo (e);
        this.nodes [node.id] [row] = e;
      }

      x += ELEMENT_SEP_X;
    });
  }
}
