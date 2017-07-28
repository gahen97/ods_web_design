class Node {
  constructor(data, next){
    this.x        = data;
    this.nextNode = next || null;
  }

  get next () { return this.nextNode; }
  set next (n) { this.nextNode = n; }

  get data () { return this.x; }
}
