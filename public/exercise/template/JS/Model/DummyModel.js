/*jshint esversion: 6 */

class DummyModel extends Model {
  constructor()
  {
    this.arr = new Array();
  }

  get()
  {
    return this.arr;
  }

  equals(other)
  {
    if (!(other instanceof DummyModel))
    {
      return false;
    }

    if (this.arr.length !== other.arr.length)
    {
      return false;
    }

    for (var index in this.arr)
    {
      if (this.arr[index] !== other.arr[index])
      {
        return false;
      }
    }

    return true;
  }
}
