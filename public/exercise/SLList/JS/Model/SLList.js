/*
  Singly Linked List ...
*/

class SinglyLinkedList extends Model {
  constructor(){
    super ();

    this.head = null;
    this.tail = null;
    this.n    = 0;

    this.nodes = { };
  }

  /* ---- PRIVATE ---- */
  _create (value, next) {
      var newNode = new Node (value, next);
      this.nodes [newNode.id] = newNode;
      return newNode;
  }

  /* ---- OPERATIONS ----- */
  push (data) {
    var newNode = this._create (data, this.head)
    this.head   = newNode;

    if (!this.n)
      this.tail = newNode;

    this.n++;
    return data;
  }

  pop () {
    if (!this.n) return null;

    var retVal = this.head.data;
    this.head  = this.head.next;

    if (! (--this.n)) // n -= 1; n != 0
      this.tail = null;

    return retVal;
  }

  remove () {
    return this.pop ();
  }

  add (data) {
    var newNode = this._create (data);

    if (!this.n)
      this.head = newNode;
    else
      this.tail.next = newNode;

    this.tail = newNode;
    this.n ++;

    return data;
  }

  /* ---- USER MODEL ---- */
  _findById(id) { return this.nodes [id] || null; }

  connect (sourceId, targetId) {
    var n1 = this._findById (sourceId);
    var n2 = this._findById (targetId);

    if (!n1) return;
    n1.next = n2;
  }

  create (value){ return this._create(value); }

  /* ------ HELPERS ------ */
  each (f) {
    var curNode = this.head;
    while (curNode) {
      var r = f (curNode.data, curNode);

      if (r === false) return;

      curNode = curNode.next;
    }
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
    var n2 = other.head;
    this.each ((d1, n1)=>{
      if (!checkNode (n1, n2)){
        equal = false;
        return false;
      }
      n2 = n2.next;
    })

    // only true if we didn't find a difference in the nodes
    //  & there's no more elements in other (after going through self)
    return equal && !n2;
  }

  copy()
  {
    var newList = new SinglyLinkedList ();

    this.each ((d) => {
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
