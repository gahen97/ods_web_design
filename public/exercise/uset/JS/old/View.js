/*
  This has to be changed for different exercises.
  Mainly the DOM Related parts - dealing with the model display
*/

class View extends ViewBase {
  constructor(){
    super(...arguments);
  }

  // start up a new view
  start () {
    super.start.apply (this, arguments);
    this.addElement (NULL_CHARACTER, {withinModel: true});
  }

  // clear the view
  clear (opts) {
    if (!opts) opts = { };
    if (!opts.checkFunc && opts.checkFunc !== false)
      opts.checkFunc = (e) => {
        return (e.getValue () !== NULL_CHARACTER);
      }

    super.clear (opts);
  }

  // remove an element from the view
  removeElements (elems, checkFunc) {
    if (!checkFunc && checkFunc !== false)
      checkFunc = function(e){
        return e.getValue () !== NULL_CHARACTER;
      }

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

  displayModel (m) {
    // TODO Remove any elements that should not be shown
    for (var k in this.elements){
      var value = this.elements [k].getValue ();
      var elem  = this.elements [k].getElementDiv ();

      if (value !== NULL_CHARACTER
            && this.modelDivHelper.elementOver (elem)
            && !m.contains (value))
      {
        this.removeElementById (k);
      }
    }

    m.each ((element) => {
      var elems = this.findByValue (element);

      // if we have one but its not in the set, remove it ...
      if (elems){
        var found = false;
        this.removeElements (elems, (e)=>{
          if (found) return this.isElementOverModel (e.getElementDiv ());
          var isInSet = this.isElementOverModel (e.getElementDiv ());

          if (isInSet)
            found = true;

          return !isInSet;
        });
      }

      // add it to the set
      if (!this.contains (element))
        this.addElement (element, {withinModel: true});
    });
  }
}
