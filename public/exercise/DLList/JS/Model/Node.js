class Node {
  static getNextId () { return Node.id ++; }

  constructor(data, next){
    this.x        = data;
    this.nextNode = next || null;
    this.id       = Node.getNextId();
  }

  get next () { return this.nextNode; }
  set next (n) { this.nextNode = n; }

  get data () { return this.x; }
  set data (x) { this.x = x; }
}

Node.id = 1001;
