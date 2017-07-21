const animMap = {
  "fadein": FadeIn,
  "fadeout": FadeOut,
  "classfadein": ClassFadeIn,
  "traverse": Traverse
}

class Animation {
  static run (type, e, opts, ...rest){
    var animation = this.getAnimationFrom (type);
    if (!animation) return false;

    // Apply any defaults which have to be set
    // Returns the result here
    opts = this.applyDefaults (opts);

    // Run the animation
    var args = [e, opts].concat (rest);
    animation.runAnimation.apply (animation, args);
  }

  static applyDefaults (opts){
    if (!opts) opts = { };

    var animationDefaults = AnimationSettings.defaults;
    for (var option in animationDefaults)
      if (!opts [option] && opts [option] !== 0)
        opts [option] = animationDefaults [option];

    return opts;
  }

  static getAnimationFrom (type){
    if (!type) return null;

    var t         = type.toLowerCase ();
    var animation = animMap [t];

    return animation;
  }

}
