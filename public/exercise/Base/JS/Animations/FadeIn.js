class FadeIn {
  static runAnimation (element, opts, callback, each) {
    if (!opts) opts={};

    // determines if element is a DOM object
    if (element.nodeType === 1) element = $(element);

    element.stop();
    element.css({display: 'none'});
    element.fadeIn({
      duration: opts.duration,
      queue: false,
      progress: opts.each,
      done: opts.callback
    });
  }
}
