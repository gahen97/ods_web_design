/*
  This has to be changed for different exercises.
  Mainly the DOM Related parts - dealing with the model display
*/

class View extends ViewBase {
  constructor(){
    super(...arguments);

    // Anything else the view needs to do on construct
    this.elementsByNodeId = { };
    this.currentModel     = null;
  }

  addElement (...args) {
    var e = super.addElement (...args);

    this.elementsByNodeId [e.nodeId] = e;
    return e;
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
    this.elementsByNodeId = { };
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
  drawWithinModel (element) {
    var pos = this.modelDivHelper.randomPosition ();
    element.moveTo (pos);
  }

  addElementNode (value, nodeId, opts) {
    if (!opts) opts={};
    if (nodeId || nodeId === 0) opts.nodeId = nodeId;

    return this.addElement (value, {
      constructArgs: opts
    });
  }

  // Display ...
  updateNodesById (fromId, toId) {
    this.elementsByNodeId [toId] = this.elementsByNodeId [fromId];
    this.elementsByNodeId [fromId] = null;
  }
  fixElementNodes (fromModel, toModel) {
    // note: we can only do this if the two models are the same ....
    if (!fromModel) return false;
    if (!fromModel.equals (toModel)) return false;

    // so if we want to adjust node ids, we can basically build up a dictionary ...
    // of {old: new}.. then go through each element and adjust to new
    //  (i'm learning to fly)
    var nodesMap = fromModel.mapTo (toModel);

    for (var e in this.elements) {
      var elem  = this.elements [e];
      var newId = nodesMap [elem.nodeId];
      if (newId){
        this.updateNodesById (elem.nodeId, newId);
        elem.nodeId = newId;
      }
    }
  }

  setup (model) {
    var prevNode = null;
    var xSplit   = ELEMENT_SEP_X;
    var x        = xSplit;

    var prevNode = this.dummy;

    model.each ((data, node)=>{
      if (!data) return;

      var newNode = this.addElementNode (data, node.id);
      newNode.moveTo (this.modelDivHelper.fromOffset ({
        top: ELEMENT_Y,
        left: x
      }));

      if (prevNode) {
        prevNode.connectNext (newNode);
        newNode.connectPrev (prevNode);
      }

      prevNode = newNode;

      x += xSplit;
    });

    if (prevNode !== this.dummy){
      this.dummy.connectPrev (prevNode);
      prevNode.connectNext (this.dummy);
    }
  }

  displayModel (m) {
    this.clear ();

    // make the head & tail nodes
    var dummy = this.addElementNode (DUMMY_NODE_TEXT, m.makeDummyNode());

    // add everything from the list
    dummy.moveTo (this.modelDivHelper.fromOffset({top: 100, left: 100}));

    // save our stuff
    this.dummy = dummy;
    this.currentModel = m;

    // TODO: SHOULD SET UP HERE
    this.setup (m);

    jsPlumb.repaintEverything();
    setTimeout(()=>jsPlumb.repaintEverything(), 50);
  }


  // Getters ...
  getElem (e) { return $(e).data ("element") || this.getElement (e); }
  getNodeId (e) { return e && e.nodeId; }
  getElementFromNodeId (id) { return this.elementsByNodeId [id]; }
  getNodeFromElement (e) {
    var elem = this.getElem (e);
    return this.getNodeId (elem);
  }

  // Remove element
  removeElementById (id) {
    var element = this.elements [id];
    if (!element) return false;

    delete this.elementsByNodeId [element.nodeId];

    return super.removeElementById (id);
  }
}
