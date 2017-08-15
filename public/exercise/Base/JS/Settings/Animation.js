/*
  This controls the settings for the main Animation class.
  Currently, the settings are:
    - Duration => How long the animation, by default, will take

  Documentation:
    nextDuration ()
      Moves the duration setting to its next value.
    setDuration (value : int)
      Sets the duration setting to the given value.
    setDurationElement (element : DOMObject)
      Sets the duration's element to the given element.


    -- NOTE: METHODS BELOW HERE SHOULD ONLY BE USED INTERNALLY --
    next (name : string) : boolean
      Purpose: Moves the setting defined by name to its next value.
      Arguments:
        name  string  The name of the setting to affect.
      Returns: boolean. True if the setting was found, false otherwise.

    prev (name : string) : boolean
      Purpose: Moves the setting defined by name to its previous value.
      Arguments:
        name  string  The name of the setting to affect.
      Returns: boolean. True if the setting was found, false otherwise.

    cycle (name : string, amnt : int) : boolean
      Purpose: Cycles the setting defined by name by amnt.
      Arguments:
        name  string  The name of the setting to affect.
        amnt  int     The amount to cycle the setting by.
      Returns: boolean. True if the setting was found, false otherwise.

    set (name : string, value : Any) : boolean
      Purpose: Sets the setting defined by name to the given value.
      Arguments:
        name  string  The name of the setting to affect.
        amnt  int     The new value for the setting.
      Returns: boolean. True if the setting was found, false otherwise.

    READ-ONLY PROPERTIES:
      defaults  Object  The defaults to use for every setting.
                         This is built from the current value of the settings,
                         and composes of every setting type (see below).

    SETTINGS:
      duration  int  The duration of each animation. How long animation should last
*/

class AnimationSettings {
  /* --- CYCLING --- */
  static next (name){
    return this.cycle (name, 1);
  }
  static prev (name){
    return this.cycle (name, -1);
  }

  /* ---- MAIN FUNCTIONS ---- */
  static nextDuration (){ return this.next ('duration'); }
  static setDuration (v){ return this.set ('duration', v); }
  static setDurationElement (e) { return this.setElement ('duration', e); }

  static get defaults () {
    var defaults = { };
    for (var key in this.settings)
      defaults [key] = this.settings [key].value;
    return defaults;
  }

  /* ---- HELPERS ---- */
  static setElement (name, element) {
    var setting = this.settings [name];
    if (!setting) return false;

    setting.element = element;
  }
  static cycle (name, amnt) {
    return this.f (name, amnt, 'cycle');
  }
  static set (name, amnt){
    return this.f (name, amnt, 'set');
  }
  static f (name, amnt, func){
    var s = this.settings [name];
    var f = s && s [func];

    if (!s || !f) return false;
    f.call (s, amnt);

    return true;
  }
}

AnimationSettings.settings = {
  duration: new Setting ({
    value: 600,
    values: [2000, 600, 0]
  })
}

$(()=>{
  AnimationSettings.setElement ("duration", $("#animationDuration"));
});
