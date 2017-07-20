/*jshint esversion: 6 */ 'use strict';

class Uset extends Model {
  constructor()
  {
    super();
    this.set = { };
    this.n = 0;
  }

  size()
  {
    return this.n;
  }

  add(x)
  {
    if (this.set[x] !== undefined)
    {
      return false;
    }
    this.set[x] = x.toString();       //we want everything the same type, so strings.
    //REQUIRES OVERLOADED TOSTRING FOR OBJECTS
    this.n = this.n + 1;
    return true;
  }

  remove(x)
  {
    if (this.set[x] === undefined)
    {
      return null;
    }
    var toReturn = this.set[x];

    delete this.set [x];    // NOTE: delete actually deletes it. setting to undefined causes issues later
    this.n = this.n - 1;

    return toReturn;
  }

  find(x)
  {
    var toReturn = this.set[x] || null;
    return toReturn;
  }

  equals(other)
  {
    if (!(other instanceof Uset))
    {
      return false;
    }

    if (this.size() !== other.size())
    {
      return false;
    }

    for (var key in this.set)
    {
      /* Alludes to larger issue for templates, we're storing data in our data structures,
      and it would be nice if they're all the same type, however they can't all be objects,
      because in JS that's dangerous, because despite having a falsy value, if typeof Object returns true,
      it'll be coerced to truthy. For now we're going with strings.*/
      if (this.find(key) !== other.find(key))
      {
        return false;
      }
    }

    return true;
  }

  copy()
  {
    var copy = new Uset();

    this.each (function (element) {
      copy.add(element);
    });

    return copy;
  }



  toString ()
  {
    var result = " ";
    var set = this.set;
    for (var key in set)
      result += key + " ";

    return result;
  }

  /* NEEDED FUNCTIONS */
  each (f)
  {
    for (var i in this.set)
      f (this.set [i]);
  }
  contains (el)
  {
    return this.find (el) !== null; // note: null is allowed but ....... TODO
  }


  // TODO After refactor, this should probably be gonezo
  // moved directly into model
  /*draw (div)
  {
    control.setModel (this);

    //// TODO bad code
    //for (var i in this.set)
    //  control.view.addElement (this.set [i], {withinModel: true});
  }*/

/*  // TODO: Remove this. This is bad.
  static fromUserInput (div)
  {
    var newSet = new Uset ();
    var input  = $(".modelEntry", div);
    var user   = input.val ();

    var values = user.match (/[^ ]+/g);
    for (var i in values){
      newSet.add (values[i]);
    }

    return newSet;
  }*/
}
