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


  static inorderTraversal (curNode, func, leftPar, rightPar) {
    if (!curNode) return false;

    Traversal.inorderTraversal (curNode.left, func, leftPar, curNode);
    func (curNode.data, curNode, {
      leftParent: leftPar,
      rightParent: rightPar
    });
    Traversal.inorderTraversal (curNode.right, func, curNode, rightPar);
  }

  static preorderTraversal (curNode, func, leftPar, rightPar) {
    if (!curNode) return false;

    func (curNode.data, curNode, {
      leftParent: leftPar,
      rightParent: rightPar
    });
    Traversal.preorderTraversal (curNode.left, func, leftPar, curNode);
    Traversal.preorderTraversal (curNode.right, func, curNode, rightPar);
  }

  static postorderTraversal (curNode, func, leftPar, rightPar) {
    if (!curNode) return false;

    Traversal.postorderTraversal (curNode.left, func, leftPar, curNode);
    Traversal.postorderTraversal (curNode.right, func, curNode, rightPar);
    func (curNode.data, curNode, {
      leftParent: leftPar,
      rightParent: rightPar
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
