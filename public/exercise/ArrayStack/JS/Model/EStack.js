/*
  Stack - Exercise integration
*/

class ArrayStack extends ArrayStackImplementation {
  // Calls f on every element
  // passes arguments [ element, index ]
  each (f) {
    var n = this.size ();
    for (let i = 0; i < n; i++){
      var result = f (this.get (i), i);
      if (result === false)
        return false;
    }
    return true;
  }

  // Checks if the two stacks are equal
  equals (other) {
    if (this.size () !== other.size ()) return false;

    return this.each ((e,i)=>{
      if (other.get (i) !== e)
        return false;
    });
  }

  // Returns a new shallow copy of this arrack stack
  copy () {
    var newStack = new ArrayStack ();
    this.each ((e)=>{
      newStack.add (e);
    });

    return newStack;
  }

  // Returns in the form of [ Array 1, 2, 3 ]
  toString () {
    if (this.size() === 0)
      return "[ Array ]";

    var res = "[ Array ";
    this.each((e)=>{
      res += e + ", ";
    });

    res = res.substring (0, res.length - 2) + " ]";
    return res;
  }

  // Returns true if element exists in the array
  contains (el) {
    return !this.each ((e)=>{
      return el !== e;
    });
  }


  // update an index of an element
  update (fromIndex, toIndex) {
    this.add (toIndex, this.remove (fromIndex));
  }
}
