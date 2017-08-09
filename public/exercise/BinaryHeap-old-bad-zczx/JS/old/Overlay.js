class Overlay {
  static create () {
    return $("<div class='overlay'></div>");
  }
  
  constructor (div) {
    this.div  = div;
    this.$div = $(div);
    this.overlay = Overlay.create ();
  }

  disable () {
    this.overlay.appendTo (this.$div);
  }

  enable () {
    this.overlay.remove ();
  }
}
