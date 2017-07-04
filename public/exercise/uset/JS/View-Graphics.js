/*
  Contains the parts of the View that interact with the actual screen,
  and, therefore, would have to be changed for each exercise ...

  cry, agony.
  cry, agony.
*/

class Graphics {
  constructor(view) {
    this.view = view;
  }

  drawModel (m) {
    // TODO Remove any elements that should not be shown
    for (var k in this.view.elements){
      var value = this.view.elements [k].getValue ();
      var elem  = this.view.elements [k].getElementDiv ();

      if (value !== NULL_CHARACTER
            && this.view.modelDivHelper.elementOver (elem)
            && !m.contains (value))
      {
        this.view.removeElementById (k);
      }
    }

    m.each ((element) => {
      var elem = this.view.findByValue (element);

      // if it's in the set, ignore it ....
      if (elem && this.view.modelDivHelper.elementOver (elem.getElementDiv ()))
        return;

      // if we have one but its not in the set, remove it ...
      if (elem)
        this.view.removeElementById (elem.getId ());

      // add it to the set
      this.view.addElement (element, {withinModel: true});
    });
  }
}
