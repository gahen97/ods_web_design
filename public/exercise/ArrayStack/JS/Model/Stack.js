class ArrayStackImplementation extends Model {
  constructor(){
    super();

    this.arr = [ ];
    this.l   = 0;
  }

  size(){
    return this.arr.length;
  }

  get (i) {
    return this.arr [i];
  }

  set (i, x) {
    var y = this.arr [i];
    this.arr [i] = x;
    return y;
  }

  add (i, x) {
    if (this.arr.length + 1 > this.l) this.resize();
    if (!x && x !== 0){
      x = i;
      i = this.arr.length;
    }

    this.arr.splice (i, 0, x);
  }

  remove (i) {
    var element = this.arr [i];

    this.arr.splice (i, 1);

    if (this.l >= 3 * this.arr.length)
      this.resize ();

    return element;
  }

  resize () {
    this.l = this.arr.length * 2;
  }
}
