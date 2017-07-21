class Setting {
  constructor(data){
    this.value   = data.value;
    this.values  = data.values;
    this.ctr     = data.ctr || this.detectCtr ();

    this.elem    = data.element;
    this.$elem   = $ (this.element);
  }

  next(){   return this.cycle (1);  }
  prev (){  return this.cycle (-1); }
  set (value) { this.value = value; }

  set element (e) {
    this.elem  = e;
    this.$elem = $(e);
  }
  
  cycle (dir) {
    this.$elem.removeClass ("anim" + this.ctr);

    this.ctr = Math.abs ((this.ctr + dir) % this.values.length);
    this.value = this.values [this.ctr];

    this.$elem.addClass ("anim" + this.ctr);

    return this.value;
  }

  detectCtr () {
    return this.values.indexOf (this.value);
  }
}
