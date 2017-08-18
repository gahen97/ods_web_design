class Node {
  static get nextId (){ return Node.id ++; }

  constructor(data, height, props){
    this.data = data;
    this.next = [ ];
    this.prev = [ ];

    // set initial height
    for (let i = 0; i < height; i++)
      this.next [i] = null;

    // copy all properties to the node
    for (var propName in props){
      if (this [propName]){
        console.error ("cannot create new property ", propName);
        return false;
      }
      this [propName] = props [propName];
    }

    this.id = Node.nextId;
  }

  get height(){
    return this.next.length;
  }

  setNext (row, node) {
    this.next [row] = node;
    if (node)
      node.prev [row] = this;
  }

  getPrev (row) {
    return this.prev [row];
  }
  getNext (row) {
    return this.next [row];
  }
}

Node.id = 1000;
