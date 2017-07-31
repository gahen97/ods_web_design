class PlumbDraggable {
  constructor (eObj, element){
    this.element = element;
    this.elemObj = eObj;

    $ (element).draggable ({
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
