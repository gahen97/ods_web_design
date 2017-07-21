/*
  Ideally, we have an Options menu or something where users can select different settings.
  For now, I'm making functionality for this and we can implement something
   later.
*/

class AnimationSettings {
  static nextDuration (){ return this.settings.duration.next(); }
  static setDuration (v){ return this.settings.duration.set(v); }

  static get defaults () {
    var defaults = { };
    for (var key in this.settings)
      defaults [key] = this.settings [key].value;
    return defaults;
  }
}

AnimationSettings.settings = {
  duration: new Setting ({
    value: 600,
    values: [0, 300, 600, 1000, 2000]
  })
}
