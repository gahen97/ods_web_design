/*
  This controls a Setting, which is something that can be cycled through &
    set by the user. This mostly allows the user to choose what they like.

  Documentation:
    constructor (data : SettingsData)
      Initializes a new setting object. See SettingsData below

    next () : Any
      Proceeds to the next value and returns it.
    prev () : Any
      Moves to the last value and returns it.

  SettingsData:
    value    Any           The starting value to use for the setting
    values   Array of Any  The values which the setting may be set to
    ctr      int           The starting counter value. This determines where
                             in the list of values to start. This is optional;
                             if not included, will be auto-detected.
    cb       function      A function to call when the setting is being changed.
    element  DOMObject     An element to display the animation change inside of.
                             [ OPTIONAL ] Defaults to none.
                             If provided, will cycle through toggling anim# class
*/

class Setting {
  constructor(data){
    this.value   = data.value;
    this.values  = data.values;
    this.ctr     = data.ctr || this.detectCtr ();
    this.cb      = data.cb || ()=>{};
    this.elem    = data.element || null;
  }

  next(){   return this.cycle (1);  }
  prev (){  return this.cycle (-1); }
  set (value) {
    this.value = value;
    this.ctr   = this.detectCtr ();
  }

  set element (e) {
    this.elem  = e;
    this.$elem = $(e);
  }

  _updateElement (prevCtr){
    if (!this.$elem) return;
    this.$elem.removeClass ("anim" + prevCtr);
    this.$elem.addClass ("anim" + this.ctr);
  }

  cycle (dir) {
    var prevCtr = this.ctr;

    this.ctr = Math.abs ((this.ctr + dir) % this.values.length);
    this.value = this.values [this.ctr];

    this._updateElement (prevCtr);
    this.cb (this.value, this.ctr);

    return this.value;
  }

  detectCtr () {
    return this.values.indexOf (this.value);
  }
}
