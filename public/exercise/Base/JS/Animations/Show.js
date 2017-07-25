class Show {
  static runAnimation (element, opts) {
    if (!opts) opts={};

    // determines if element is a DOM object
    if (element.nodeType === 1) element = $(element);

  //console.log (element.is (":animated"));
    //if (!element.is(":animated"))
    /*  element.effect({
        effect: opts.effect,
        duration: opts.duration,
        easing: opts.easing,
        queue: false,
        done: opts.callback
      });*/

    element.effect (
      opts.effect,
      opts.options,
      opts.duration,
      opts.callback
    )
  }
}
