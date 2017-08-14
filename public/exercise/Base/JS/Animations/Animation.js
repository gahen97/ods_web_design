/*
  This controls any animations that run during an exercise.

  Documentation:
    This must be performed from a static context (i.e. Animation.run)

    run (type : string, element : DOMObject, opts : Options, ...) : boolean
      Purpose: Runs the animation matching the given type on the given element.
      Arguments:
        type     string     The type of animation to run. See AnimationTypes below.
        element  DOMObject  The element to run the animation on.
        opts     Options    Options for the animation. See the animation itself
                              for the options it supports.
        ...      ANY        Any parameters to be passed to the animation.
      Returns: Boolean determining if the animation is running.

    AnimationTypes:
      Fade-In        The element will gradually fade in.
      Fade-Out       The element will gradually fade out.
      Class-Fade-In  The element will gradually fade the changes from a class in.
      Traverse       This will display a div travelling through the given path,
                       connecting every element in the array. Note element in
                       this context should be an Array of Elements.
      Show           Performs a series of operations matching JQueryUI's show.
                       https://jqueryui.com/show/
      Glow           Performs a glow effect on the element by changing its text color.
*/

/*jshint esversion: 6 */ 'use strict';

const animMap = {
  "fadein": FadeIn,
  "fadeout": FadeOut,
  "classfadein": ClassFadeIn,
  "traverse": Traverse,
  "show": Show,
  "glow": Glow
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
    return true;
  }

  static _applyDefaults (opts){
    if (!opts) opts = { };

    var animationDefaults = AnimationSettings.defaults;
    for (var option in animationDefaults)
      if (!opts [option] && opts [option] !== 0)
        opts [option] = animationDefaults [option];

    return opts;
  }

  static getAnimationFrom (type){
    if (!type) return null;

    var t         = type.replace(/-/g, "").toLowerCase ();
    var animation = animMap [t];

    return animation;
  }

}
