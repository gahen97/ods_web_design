class JsPlumbDraggable {
  constructor (element){
    jsPlumb.draggable (element);
    /*this.element = element;
    $ (element).draggable ({
      drag: function () {
        jsPlumb.repaintEverything ();
      }
    });*/
  }

  setDraggable (t) {
    jsPlumb.setDraggable (this.element, t);
  }
}
