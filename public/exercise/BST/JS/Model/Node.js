/*
  Simple Node
*/
/*jshint esversion: 6 */

class Node {
  static getNextId () { return Node.currentId ++; }
  
  constructor(data){
    this.data      = data;
    this.leftNode  = null;
    this.rightNode = null;
    this.parent    = null;

    this.id        = Node.getNextId ();
  }

  get left () { return this.leftNode; }
  set left (newLeft) {
    newLeft.parent = this;
    this.leftNode  = newLeft;
  }

  get right () { return this.rightNode; }
  set right (newRight) {
    newRight.parent = this;
    this.rightNode  = newRight;
  }
}


Node.currentId = 17;
