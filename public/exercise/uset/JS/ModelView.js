// TODO find better way to do this
View.prototype.displayModel = function (m) {
  // TODO Remove any elements that should not be shown
  for (var k in this.elements){
    var value = this.elements [k].getValue ();
    if (value !== NULL_CHARACTER && !m.contains (value))
      this.removeElementById (k);
  }

  m.each ((element) => {
    if (!this.findByValue (element))
      this.addElement (element, {withinModel: true});
  });
}
