class PlumbDraggable {
  constructor (eObj, element){
    this.element = element;
    this.elemObj = eObj;

    $ (element).draggable ({
      containment: 'parent',
      drag: () => {
        //this.elemObj.repaint ();
        console.log("hi");
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
