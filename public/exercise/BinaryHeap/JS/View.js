/*
  This has to be changed for different exercises.
  Mainly the DOM Related parts - dealing with the model display


  TODO: If second-to-last row has two elements, each with two children,
  they'll probably collide. may be worth fixing. unicorns and leprechauns and fairies
  and donkeys! and donkey riding. way hey and away i go, donkey riding, donkey riding.
  way hey and away i go, riding on a donkey.
*/

class View extends ViewBase {
  constructor(){
    super(...arguments);

    // Anything else the view needs to do on construct
    this.elementsFromNode = { };
  }

  // start up a new view
  start () {
    // Draw the starting point for the view with no elements
  }

  // clear the view
  clear (opts) {
    // Clear the view. This can call the super clear with a checkFunc
    // [ opts.checkFunc ]. If checkFunc returns true, an element will be deleted;
    // otherwise element will be bypassed
    if (!opts) opts = { };

    // Implement opts.checkFunc here

    super.clear (opts);

    this.elementsFromNode = { };
  }

  findFromNid (id) {
    return this.elementsFromNode [id];
  }

  getIdFromElementDiv (e) {
      var elem = this.getElement (e);
      return elem && elem.nodeId;
  }

  // remove an element from the view
  removeElements (elems, checkFunc) {
    // checkFunc returns true if an element is to be deleted
    super.removeElements (elems, checkFunc);
  }

  // Is an element in the model
  isElementOverModel (element) {
    // NTS: Element here is the div
    return this.modelDivHelper.elementOver (element);
  }

  // draw an element within the model
  drawWithinModel (element, data) {
    if (!data) return false;

    var x = data.x;
    var y = data.y;

    var pos = this.modelDivHelper.fromOffset ({
      top: y,
      left: x
    })

    element.moveTo ({
      top: pos.top,
      left: x
    });
  }

  connect (n1, n2, dir) {
    if (n1 && n2 && this.elementsFromNode [n1.id])
      this.elementsFromNode [n1.id].connectTo (this.elementsFromNode [n2.id], dir);
  }

  displayModel (model) {
    if (!model) model = this.currentModel;
    this.currentModel = model;

    var m = model.tree;

    // Clear the model so we can draw a new tree
    this.clear ();

    var deepest = m.height ();

    // increase model height to fit depth
    var height = (deepest + 1) * 70;
    this.modelBodHelper.setHeight (height);

    // draw the tree
    Tree.display (model.tree, this.modelBodHelper.getDimensions(), this);

    // NOTE: JsPlumb doesn't do well with drawing here and produces errors.
    // Ideally, we fix the errors. For now, though, we can repaint
    // jsPlumb is weird. Repainting once doesn't work.
    // Twice half works.
    // Three times and it works. :/.
    jsPlumb.repaintEverything ();
    jsPlumb.repaintEverything ();
    jsPlumb.repaintEverything ();
  }

  resizeModel ()
  {
    super.resizeModel ();
    this.displayModel ();
  }

  fixPositions ()
  {
    this.displayModel ();
  }

  reset ()
  {
    $(".path-node").removeClass ("path-node");
    $(".path-node-plumb").removeClass ("path-node-plumb");
    $(".active").removeClass ("active");
    $(".can-set-active").removeClass ("can-set-active");
  }


  runAnimations(cb){
    Animation.run ("show", $(".can-set-active"), {
      effect: "bounce",
      options: {
        distance: 7,
        times: 3
      },
      callback: cb
    });
  }
}
