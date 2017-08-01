class TermQuestion extends BTQuestion {
  get fullName () {
    return this.name.toLowerCase() + " = " + this.getParametersString();
  }
}
