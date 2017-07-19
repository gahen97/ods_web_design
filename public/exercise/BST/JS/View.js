/*
  This has to be changed for different exercises.
  Mainly the DOM Related parts - dealing with the model display


  TODO: If second-to-last row has two elements, each with two children,
  they'll probably collide. may be worth fixing. unicorns and leprechauns and fairies
  and donkeys! and donkey riding. way hey and away i go, donkey riding, donkey riding.
  way hey and away i go, riding on a donkey.
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

    this.elementsFromNode = { };
  }

  findFromNid (id) {
    return this.elementsFromNode [id];
  }

  getIdFromElementDiv (e) {
      var elem = this.getElement (e);
      return elem && elem.nodeId;
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

    element.moveTo ({
      top: pos.top,
      left: x
    });
  }

  connect (n1, n2, dir) {
    if (n1 && n2 && this.elementsFromNode [n1.id])
      this.elementsFromNode [n1.id].connectTo (this.elementsFromNode [n2.id], dir);
  }

  displayModel (m) {
    if (!m) m = this.currentModel;
    this.currentModel = m;

    // Clear the model so we can draw a new tree
    this.clear ();

    var deepest = m.height ();

    // increase model height to fit depth
    var height = (deepest + 1) * 70;
    this.modelBodHelper.setHeight (height);

    // Draw the tree of life
    Traversal.preorder (m, (data, node, stats)=>{
      // The top should just be the depth of the node.
      var depth = m.depth (data);

      /* This is a bit more tricky. For the left,
       *   we want it to be centered between the two above elements.
       *   Say, for example, we have a tree like this:
       *                5
       *             3    7
       *            1 4  6 8
       *  This looks like a tree - and every element is centered by
       *   its two parents; for example, 4 is between 3 and 5.
       *   6 is between 5 and 7. So by getting the last point where
       *   the element went to the left and to the right, we can
       *   record the position of these two elements and find their midpoint,
       *   which will then be where we have to draw the new element.

       *  A few notes on this:
       *    1) We're using a preorder, so all left/right upper nodes
       *         will have been drawn by the time we reach a child.
       *    2) If a node does not have a left upper node, such as 1 in the
       *         example, it will be based on the left-most point of the model.
       *    3) If a node does not have a right upper node, it will be based on
       *         the right upper point of the model.
       *    4) Because at the furthest points we are at the two sides of the model,
       *         we can safely assume it will never go outside of the model.
       *    5) We have an issue, however. At some point, if it goes far enough,
       *         child nodes will seemingly be placed right underneath a parent;
       *         this may require testing & bug fixing.
       *
       *  The code is fairly long, but it's a fairly decent method for this.
       */

       // So first, check if we have a left, right upper node / element
      var lastLeft = stats.leftParent;
      var lastRight = stats.rightParent;

      var lastLElem, lastRElem;
      if (lastLeft)
        lastLElem = this.elementsFromNode [lastLeft.id];
      if (lastRight)
        lastRElem = this.elementsFromNode [lastRight.id];

      // Determine the left and right bordering points (see above)
      var leftPoint, rightPoint;
      if (!lastLElem)
        leftPoint = this.modelDivHelper.getDimensions ().xP;
      else
        leftPoint = lastLElem.offset().left;

      if (!lastRElem) {
        var dimensions = this.modelDivHelper.getDimensions ();
        rightPoint = dimensions.xP + dimensions.width;
      } else
        rightPoint = lastRElem.offset().left;

      // Add the element at the determined x & y position
      var newElem = this.addElement (data, {
        withinModel: true,
        data: {
          x: (leftPoint + rightPoint) / 2,
          y: depth * LEVEL_HEIGHT
        },
        constructArgs: {
          maxDepth: deepest,
          level: depth,
          nodeId: node.id
        }
      });

      // and add it into our node->element map, so we can find it later
      this.elementsFromNode [node.id] = newElem;

      // edge case
      var p = node && node.parent;
      if (p && p.right && p.left) {
        var leftElem = this.elementsFromNode [p.left.id];
        var rightElem = this.elementsFromNode [p.right.id];

        if (!leftElem || !rightElem) return;

        var minLeft = leftElem.offset ().left + leftElem.outerWidth () + 2;
        if (rightElem.offset ().left < minLeft)
          rightElem.offset ({
            left: minLeft
          });
      }

      this.maxDepth = deepest;
    });

    // Now we can connect these nodes on one more scan.
    // For every node, connect it to its left & right children
    Traversal.inorder (m, (data, node)=>{
      this.connect (node, node.left, DIRECTION_LEFT);
      this.connect (node, node.right, DIRECTION_RIGHT);
    })

    // NOTE: JsPlumb doesn't do well with drawing here and produces errors.
    // Ideally, we fix the errors. For now, though, we can repaint
    // jsPlumb is weird. Repainting once doesn't work.
    // Twice half works.
    // Three times and it works. :/.
    jsPlumb.repaintEverything ();
    jsPlumb.repaintEverything ();
    jsPlumb.repaintEverything ();
  }

  resizeModel ()
  {
    super.resizeModel ();
    this.displayModel ();
  }

  fixPositions ()
  {
    this.displayModel ();
  }
}
