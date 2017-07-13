class JsPlumbDraggable {
  constructor (eObj, element){
/*    jsPlumb.draggable (element, {
      grid:[1, 99999]
    });*/
    this.element = element;
    this.elemObj = eObj;

    $ (element).draggable ({
      axis: 'x',
      containment: 'parent',
      drag: () => {
        //this.elemObj.repaint ();
        jsPlumb.repaintEverything ();
      },
      stop: () => {
        jsPlumb.repaintEverything ();
      }
    });
  }

  setDraggable (t) {
    jsPlumb.setDraggable (this.element, t);
  }
}
