/*
  Supports:
    - Breadth First Search (.breadthFirst)
    - Depth First Search   (.depthFirst)
    - In-Order Traversal   (.inorder)
    - Pre-order Traversal  (.preorder)
    - Post-order Traversal (.postorder)

    Each calls a callback function (tree, callback)
      with data, node
*/

class Traversal{
  static breadthFirstSearch (rootNode, func) {
    if (!rootNode) return false;

    var nodes = [rootNode];
    var i     = 0;
    while (nodes.length>i){
      var curNode = nodes [i++];
      func (curNode.data, curNode);

      if (curNode && curNode.left) nodes.push (curNode.left);
      if (curNode && curNode.right) nodes.push (curNode.right);
    }
  }

  static depthFirstSearch (curNode, func) {
    if (!curNode) return false;

    func (curNode.data, curNode);
    Traversal.depthFirstSearch (curNode.left, func);
    Traversal.depthFirstSearch (curNode.right, func);
  }


  static inorderTraversal (curNode, func, leftPar, rightPar, depth) {
    if (!curNode) return false;
    if (!depth) depth = 0;

    Traversal.inorderTraversal (curNode.left, func, leftPar, curNode, depth+1);
    func (curNode.data, curNode, {
      leftParent: leftPar,
      rightParent: rightPar,
      depth: depth
    });
    Traversal.inorderTraversal (curNode.right, func, curNode, rightPar, depth+1);
  }

  static preorderTraversal (curNode, func, leftPar, rightPar, depth) {
    if (!curNode) return false;
    if (!depth) depth = 0;

    func (curNode.data, curNode, {
      leftParent: leftPar,
      rightParent: rightPar,
      depth: depth
    });
    Traversal.preorderTraversal (curNode.left, func, leftPar, curNode, depth+1);
    Traversal.preorderTraversal (curNode.right, func, curNode, rightPar, depth+1);
  }

  static postorderTraversal (curNode, func, leftPar, rightPar, depth) {
    if (!curNode) return false;
    if (!depth) depth = 0;

    Traversal.postorderTraversal (curNode.left, func, leftPar, curNode, depth+1);
    Traversal.postorderTraversal (curNode.right, func, curNode, rightPar, depth+1);
    func (curNode.data, curNode, {
      leftParent: leftPar,
      rightParent: rightPar,
      depth: depth
    });
  }

  static inorder (tree, func){
    Traversal.inorderTraversal (tree.root, func);
  }
  static preorder (tree, func){
    Traversal.preorderTraversal (tree.root, func);
  }
  static postorder (tree, func){
    Traversal.postorderTraversal (tree.root, func);
  }
  static breadthFirst (tree, func){
    Traversal.breadthFirstSearch (tree.root, func);
  }
  static depthFirst (tree, func){
    Traversal.depthFirstSearch (tree.root, func);
  }
}
