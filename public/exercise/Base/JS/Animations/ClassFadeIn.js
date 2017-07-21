class ClassFadeIn {
  static runAnimation (element, opts, callback, each) {
    if (!opts) opts={};
    if (!callback) callback=()=>{};

    // determines if element is a DOM object
    if (element.nodeType === 1) element = $(element);

    element.stop();
    element.switchClass (opts.remClass || "",
                         opts.class,
                         {
                           duration: opts.duration || 600,
                           complete: callback,
                           queue: false
                         }
    );
  }
}
