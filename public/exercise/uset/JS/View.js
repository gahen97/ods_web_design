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
      var elem = this.findByValue (element);

      // if it's in the set, ignore it ....
      if (elem && this.modelDivHelper.elementOver (elem.getElementDiv ()))
        return;

      // if we have one but its not in the set, remove it ...
      if (elem)
        this.removeElementById (elem.getId ());

      // add it to the set
      this.addElement (element, {withinModel: true});
    });
  }
}
