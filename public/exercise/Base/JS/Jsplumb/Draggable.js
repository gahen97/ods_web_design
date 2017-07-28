class PlumbDraggable {
  constructor (eObj, element, options){
    jsPlumb.draggable (element, options);

    this.element = element;
    this.eObj    = eObj;
  }

  setDraggable (t) {
    jsPlumb.setDraggable (this.element, t);
  }
}
