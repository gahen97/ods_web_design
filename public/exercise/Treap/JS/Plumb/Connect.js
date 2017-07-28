class JsPlumbConnect extends PlumbConnect {
  constructor(){
    super(...arguments);
  }

  /* ---- Direction Helpers ----- */
  setDirection (dir) {
    this.direction = dir;
    return this;
  }

  getDirection(){ return this.direction; }
}
