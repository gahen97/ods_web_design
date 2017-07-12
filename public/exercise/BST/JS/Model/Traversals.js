class Traversal{
  static inorderTraversal (root, func) {
    if (!root) return false;

    Traversal.inorderTraversal (root.left, func);
    func (root.data, root);
    Traversal.inorderTraversal (root.right, func);
  }

  static preorderTraversal (root, func) {
    if (!root) return false;

    func (root.data, root);
    Traversal.preorderTraversal (root.left, func);
    Traversal.preorderTraversal (root.right, func);
  }

  static postorderTraversal (root, func) {
    if (!root) return false;

    Traversal.postorderTraversal (root.left, func);
    Traversal.postorderTraversal (root.right, func);
    func (root.data, root);
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
