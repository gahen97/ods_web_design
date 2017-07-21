class Setting {
  constructor(data){
    this.value  = data.value;
    this.values = data.values;
    this.ctr    = data.ctr || this.detectCtr ();
  }

  next(){   return this.cycle (1);  }
  prev (){  return this.cycle (-1); }
  set (value) { this.value = value; }

  cycle (dir) {
    this.ctr = Math.abs ((this.ctr + dir) % this.values.length);

    this.value = this.values [this.ctr];
    return this.value;
  }

  detectCtr () {
    return this.values.indexOf (this.value);
  }
}
