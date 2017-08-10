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

  drawConnections (model) {
    var prevNode;

    var _connect = (prev, cur)=>{
      if (!prev || !cur) return;
      prev.connectNext (cur);
      cur.connectPrev (prev);
    }

    model.each ((data, node) => {
      var curNode = this.getElementFromNodeId (node.id);
      if (!curNode) return;

      if (prevNode)
        _connect (prevNode, curNode);

      prevNode = curNode;
    });

    if (prevNode)
      _connect (prevNode, this.dummy);
  }

  _calculatePositions (model) {
    var positions = { };
    if (!model) return positions;

    model.each((data,node)=>{
      var elem = this.getElementFromNodeId (node.id);
      if (elem)
        positions [node.id] = elem.offset ();
    });

    return positions;
  }

  _calcNewPosition () {
    return this.modelDivHelper.randomPosition ();
  }

  positionElements (model, prevModel) {
    if (!model) return false;
    if (!prevModel) prevModel = this.currentModel;

    // We need some way to access the old elements from our new model ...
    //   this will be our map for that
    var map         = model.mapTo (prevModel);

    // We want to store our positions so we can add elements
    //   without worrying about removing the old model
    var oldPositions = this._calculatePositions (prevModel);
    this.clear ();

    // THIS IS A BIT TRICKY
    //   1. Given a node id, map it to the old model
    //   2. Given old model's id, find it in the old positions
    var _posFrom = (nodeId)=>oldPositions [map [nodeId]];

    // Make the new model
    model.each ((data, node) => {
      var newElement = this.addElementNode (data, node.id);
      var oldPos     = _posFrom (node.id);


      var position = oldPos ? oldPos : this._calcNewPosition();
      newElement.moveTo (position);

      if (node === model.dummy)
        this.dummy = newElement;
    });

    // we're good here
  }

  displayModel (m) {
    this.positionElements (m);
    this.drawConnections (m);

    this.currentModel = m;

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
