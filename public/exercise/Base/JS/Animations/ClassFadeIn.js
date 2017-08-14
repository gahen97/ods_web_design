class ClassFadeIn {
  static runAnimation (element, opts) {
    if (!opts) opts={};

    // determines if element is a DOM object
    if (element.nodeType === 1) element = $(element);

    element.stop();
    element.switchClass
      (opts.remClass || "",
      opts.class,
       {
         duration: opts.duration,
         complete: opts.callback,
         queue: false
       });
  }
}
