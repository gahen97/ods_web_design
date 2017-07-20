class FadeIn {
  static runAnimation (element, callback, each, opts) {
    if (typeof each === 'object'){
      opts=each;
      each=undefined;
    }
    if (!opts) opts={};

    // determines if element is a DOM object
    if (element.nodeType === 1) element = $(element);

    element.stop();
    element.css({display: 'none'});
    element.fadeIn({
      duration: opts.duration || 600,
      queue: false,
      progress: each,
      done: callback
    });
  }
}
