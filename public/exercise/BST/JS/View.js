/*
  This has to be changed for different exercises.
  Mainly the DOM Related parts - dealing with the model display
*/

class View extends ViewBase {
  constructor(){
    super(...arguments);

    // Anything else the view needs to do on construct
    this.elementsFromNode = { };
  }

  // start up a new view
  start () {
    // Draw the starting point for the view with no elements
  }

  // clear the view
  clear (opts) {
    // Clear the view. This can call the super clear with a checkFunc
    // [ opts.checkFunc ]. If checkFunc returns true, an element will be deleted;
    // otherwise element will be bypassed
    if (!opts) opts = { };

    // Implement opts.checkFunc here

    super.clear (opts);
  }

  // remove an element from the view
  removeElements (elems, checkFunc) {
    // checkFunc returns true if an element is to be deleted
    super.removeElements (elems, checkFunc);
  }

  // Is an element in the model
  isElementOverModel (element) {
    // NTS: Element here is the div
    return this.modelDivHelper.elementOver (element);
  }

  // draw an element within the model
  drawWithinModel (element, data) {
    if (!data) return false;

    var x = data.x;
    var y = data.y;

    var pos = this.modelDivHelper.fromOffset ({
      top: y,
      left: x
    })

    element.moveTo (pos);
  }

  connect (n1, n2) {
    if (n1 && n2 && this.elementsFromNode [n1.id])
      this.elementsFromNode [n1.id].connectTo (this.elementsFromNode [n2.id]);
  }

  displayModel (m) {
    var x = 0;
    var numNodes = m.size ();

    this.clear ();

    Traversal.inorder (m, (data, node)=>{
      var depth = m.depth (data);
      var index = x++;

      var newElem = this.addElement (data, {
        withinModel: true,
        data: {
          x: index * 70,
          y: depth * 70
        }
      });

      this.elementsFromNode [node.id] = newElem;
    });

    // go through again, getting every element and connecting it
    // to it's left and right children
    Traversal.inorder (m, (data, node)=>{
      this.connect (node, node.left);
      this.connect (node, node.right);
    })
  }
}
