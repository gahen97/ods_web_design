class Node {
  static getNextId (){ return Node.id ++; }

  constructor(data, height, props){
    this.data = data;
    this.next = [ ];

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
  }

  get height(){
    return this.next.length;
  }
}
