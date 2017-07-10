/*
  Mainly for parts of the View that'll change between exercises,
  so this can be stored outside of the main View stuff

  cry, agony.
  cry, agony.
*/

class View extends ViewBase {
  constructor(){
    super(...arguments);
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
          if (found) return true;
          var isInSet = this.modelDivHelper.elementOver (e.getElementDiv ());

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
