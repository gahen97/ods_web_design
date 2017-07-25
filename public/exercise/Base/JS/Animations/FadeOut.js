class FadeOut {
  static runAnimation (element, opts) {
    if (!opts) opts={};

    // determines if element is a DOM object
    if (element.nodeType === 1) element = $(element);

    element.fadeOut({
      duration: opts.duration,
      queue: false,
      progress: opts.each,
      done: opts.callback
    });
  }
}
