class Tree {
  static display (tree, dimensions, view) {
    // Draw the tree of life
    Traversal.preorder (tree, (data, node, stats)=>{
      // The top should just be the depth of the node.
      var depth = tree._depth (node);

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
        lastLElem = view.elementsFromNode [lastLeft.id];
      if (lastRight)
        lastRElem = view.elementsFromNode [lastRight.id];

      // Determine the left and right bordering points (see above)
      var leftPoint, rightPoint;
      if (!lastLElem)
        leftPoint = dimensions.xP;
      else
        leftPoint = lastLElem.offset().left;

      if (!lastRElem)
        rightPoint = dimensions.xP + dimensions.width;
      else
        rightPoint = lastRElem.offset().left;

      // Add the element at the determined x & y position
      var newElem = view.addElement (data, {
        withinModel: true,
        data: {
          x: (leftPoint + rightPoint) / 2,
          y: depth * LEVEL_HEIGHT
        },
        constructArgs: {
          level: depth,
          nodeId: node.id,
          node: node
        }
      });

      // and add it into our node->element map, so we can find it later
      view.elementsFromNode [node.id] = newElem;

      // edge case
      var p = node && node.parent;
      if (p && p.right && p.left) {
        var leftElem = view.elementsFromNode [p.left.id];
        var rightElem = view.elementsFromNode [p.right.id];

        if (!leftElem || !rightElem) return;

        var minLeft = leftElem.offset ().left + leftElem.outerWidth () + 2;
        if (rightElem.offset ().left < minLeft)
          rightElem.offset ({
            left: minLeft
          });
      }
    });

    // Now we can connect these nodes on one more scan.
    // For every node, connect it to its left & right children
    Traversal.inorder (tree, (data, node)=>{
      view.connect (node, node.left, DIRECTION_LEFT);
      view.connect (node, node.right, DIRECTION_RIGHT);
    })
  }
}
