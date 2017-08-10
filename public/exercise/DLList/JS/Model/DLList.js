/*
  Doubly Linked List ...
*/

class DoublyLinkedList extends DLListBase {
  constructor(){
    super ();

    this.n     = 0;
    this.nodes = { };
  }

  /* --- OVERLOADING BASE --- */
  _addBefore (...args){
    var newNode = super._addBefore (...args);
    if (newNode)
      this.nodes [newNode.id] = newNode;
  }

  /* ---- PRIVATE ---- */
  _create (value, next) {
      var newNode = new Node (value, next);
      this.nodes [newNode.id] = newNode;
      return newNode;
  }

  _specialId (id) {
    return id === DUMMY_NODE_ID;
  }

  _connect(sourceId, targetId, dir) {
    var n1 = this._findById (sourceId);
    var n2 = this._findById (targetId);

    if (!n1 && !this._specialId (sourceId)) return;

    // Based on our direction, we want to connect ...
    //   if direction is SIDE_NEXT, we want next
    //   otherwise we want prev
    this._dir (n1, dir, ()=>n1.next=n2, ()=>n1.prev=n2);
  }

  _dir (node, direction, f1, f2){
    if (!node) return null;

    if (!f1) f1 = ()=>node.next;
    if (!f2) f2 = ()=>node.prev;

    switch (direction){
      case 0:
        return f1();
      default:
        return f2();
    }
  }

  _walk (node, dir, each){
    if (!each) each = ()=>{};
    var path = [ ];
    var cur  = node;

    while (cur) {
      if (path.indexOf(cur) !== -1) break;

      path.push (cur);
      if (each (cur.data, cur) === false)
        return path;

      cur = this._dir (cur, dir);
    }

    return path;
  }

  _each (f, dir){
    this._walk (this.dummy, dir, f);
  }

  _findById(id) {
    if (id === DUMMY_NODE_ID) return this.dummy;
    return this.nodes [id] || null;
  }

  /* ---- USER MODEL ---- */
  at (index) {
    var nodes = this.pathTo (index);
    return nodes [nodes.length-1];
  }

  find (id) { return this._findById (id); }
  connectNext (srcId, trgId) {
    this._connect (srcId, trgId, 0);
  }
  connectPrev (srcId, trgId) {
    this._connect (srcId, trgId, 1);
  }

  create (value){ return this._create(value); }
  makeDummyNode(){ return DUMMY_NODE_ID; }

  deleteNode (id) {
    var node = this._findById (id);
    if (!node) return false;

    node.next = null;
    node.prev = null;
    delete this.nodes [id];

    // remove all references to it ...
    for (var index in this.nodes) {
      if (this.nodes [index].next === node)
        this.nodes [index].next = null;
      if (this.nodes [index].prev === node)
        this.nodes [index].prev = null;
    }
  }

  // map nodes from this sllist to another sllist
  mapTo (newList) {
    if (!newList || !newList.dummy) return { };

    var cur = newList.dummy;
    var results = { };

    results [DUMMY_NODE_ID] = -1;
    this.each ((data,node)=>{
      if (!cur) return false;
      if (cur === newList.dummy && node !== this.dummy) return false;
      if (node === this.dummy && cur !== newList.dummy) return false;1

      results [node.id] = cur.id;
      cur = cur.next;
    });

    return results;
  }

  // path exists to nodes
  nodesInList () {
    return this.accessibleFrom (this.dummy);
  }

  // path does not exist to nodes
  nodesOut () {
    var nodesIn = this.nodesInList ();
    return this.excluding (nodesIn);
  }

  accessibleFrom (node) {
    if (!node) return null;
    var results  = this._walk (node, 0);
    var results2 = this._walk (node, 1);

    return results.concat (results2);
  }

  pathTo (index) {
    var p = this.dummy;
    var c;

    if (index < this.n/2) {
      c = this.n;
      return this._walk (p, 0, ()=>{
        return c-- !== index;
      })
    } else {
      c = -1;
      return this._walk (p, 0, ()=>{
        return c++ !== index;
      });
    }
  }

  /* ------ HELPERS ------ */
  each (f) {
    this._each (f, 0);
  }
  eachBack (f) {
    this._each (f, 1);
  }

  excluding (nodes) {
    // return every node that isn't in nodes
    var results = [ ];
    for (var i in this.nodes)
      if (nodes.indexOf (this.nodes [i]) === -1)
        results.push (this.nodes [i]);
    return results;
  }

  /* REQUIRED BY MODEL */
  equals(other)
  {
    var checkNode = function (n1, n2) {
      if (!n1 && n2) return false;
      if (!n2 && n1) return false;
      if (!n1 && !n2) return true;
      return n1.data === n2.data;
    }

    // compare every node, in order, to ensure they're the same
    var equal = true;
    var n2 = other.dummy.next;
    this.each ((d1, n1)=>{
      if (!checkNode (n1, n2)){
        equal = false;
        return false;
      }
      n2 = n2.next;
    })

    n2 = other.dummy.prev;
    this.eachBack ((d1, n1)=>{
      if (!checkNode(n1, n2)){
        equal = false;
        return false;
      }
      n2 = n2.prev;
    })

    // only true if we didn't find a difference in the nodes
    //  & there's no more elements in other (after going through self)
    return equal && !n2;
  }

  copy()
  {
    var newList = new DoublyLinkedList ();

    this.each ((d, node) => {
      if (d && node !== this.dummy)
        newList.add (d);
    });

    return newList;
  }



  toString (delim)
  {
    delim = delim || " ";
    var s = "";

    this.each ((d)=>{
      s += d + delim;
    });

    return s;
  }

  contains (x)
  {
    var res = false;

    this.each ((d)=>{
      if (d === x){
        res = true;
        return false;
      }
    });

    return res;
  }
}
