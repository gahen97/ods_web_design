class Traversal{
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
}
