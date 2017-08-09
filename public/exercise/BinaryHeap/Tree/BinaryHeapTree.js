/*
  Tree implementation:
    generate (array)
      BFS .....
        we have formulas for parent(), left(), right()
        we can check if left or right and assign to parent

        for i in array:
          create node from array [i]
          var p = parent (i);
          if (p > 0 && nodes [p])
            if (i % 2 === 0)
              nodes [p].left = newNode;
            else
              nodes [p].right = newNode;
          nodes [i] = newNode;

      tree-specific implementation
        isLeft (i)
          return i % 2 === 0; // based on left, right formulas
*/

class BinaryHeapTree extends BHeapTree {
  generate (array) {
    var newTree = new BinarySearchTree ();
    var nodes   = [ ];

    for (var index in array) {
      var newNode = this.makeNode (array [index]);
      var pIndex  = this.parent (index);

      // add it as a child of the parent
      if (pIndex > 0 && nodes [pIndex])
        if (this.isLeftChild (i))
          nodes [pIndex].left = newNode;
        else
          nodes [pIndex].right = newNode;

      // add it to our list of nodes
      nodes [i] = newNode;
    }

    this.root = nodes [0];
  }

  /* ---- VALIDITY ---- */
  get valid () {
    // check the heap property : for every node in the tree,
    //   excluding the root - if node.data < node.parent.data,
    //   is not valid
    var result = true;

    this.each ((data, node) => {
      if (!node.parent)
        return true;

      if (data < node.parent.data) {
        result = false;
        return false;
      }
    });

    return result;
  }
  
  /* ---- HELPERS ---- */
  // TODO WE NEED A COPY HERE BASED OFF OF AN ARRAY WHICH WILL BE PASSED IN
  copy (array) {
    var newTree = new __TREEMODULENAME__ ();
    newTree.generate (array);
    return newTree;
  }
}
