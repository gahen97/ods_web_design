class Node {
  static getNextId () { return Node.id ++; }
  static getCommonId () { return Node.cid ++; }

  constructor(data, next, prev, id, cid){
    this.x        = data;
    this.nextNode = next || null;
    this.prevNode = prev || null;
    this.cid      = cid  || Node.getCommonId();
    this.id       = id   || Node.getNextId();
  }

  get next () { return this.nextNode; }
  set next (n) { this.nextNode = n; }

  get prev () { return this.prevNode; }
  set prev (n) { this.prevNode = n; }

  get data () { return this.x; }
  set data (x) { this.x = x; }

  get common () { return this.cid; }
}

Node.id  = 1001;
Node.cid = 61;
