/*
  NOTE: I'm not super sure this is working. It seems to be.
*/

function log(b, n){ return Math.log(n) / Math.log (b); }

class ScapegoatTree extends BinarySearchTree {
  constructor(){
    super();
    this.q = 0;
  }

  /* ----- OPERATIONS ------- */
  add (x) {
    var u = new Node (x);
    if (!super._add (x, u))
      return false;
    this.q++;

    var depth = this.depth (x)
    if (depth > log (3/2, this.q)){
      var w = u.parent;

      while (3 * this._size (w) <= 2 * this._size (w.parent))
        w = w.parent;

      this.rebuild (w.parent);
    }

    return true;
  }

  remove (x) {
    if (!super.remove (x)) return false;
    if (this.n * 2 < this.q){
      this.rebuild (this.root);
      this.q = this.n;
    }
    return true;
  }


  /* ----- REBUILDING ----- */
  packIntoArray (from) {
    var arr = [ ];
    this._subtreeFrom(from).each (function (_, node) {
      arr.push (node);
    })
    return arr;
  }

  rebuild(u) {
    if (!u) return false;
    var p = u.parent;
    var a = this.packIntoArray (u);

    if (!p) {
      this.root = this.buildBalanced (a, 0, a.length);
      this.root.parent = null;
    } else if (p.right === u)
      p.right = this.buildBalanced (a, 0, a.length);
    else
      p.left = this.buildBalanced (a, 0, a.length);
  }

  buildBalanced (a, i, s) {
    if (!s) return null;
    var m = Math.floor (s/2);

    a[i + m].left = this.buildBalanced (a, i, m);
    a[i + m].right = this.buildBalanced (a, i + m + 1, s - m - 1);

    return a [i + m];
  }
}
