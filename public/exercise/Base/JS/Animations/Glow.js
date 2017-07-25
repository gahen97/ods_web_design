class Glow {
  static runAnimation (element, opts) {
    if (!opts) opts={};

    // determines if element is a DOM object
    if (element.nodeType === 1) element = $(element);

    Animation.run ("class-fade-in", element, {
      class: "text-highlight",
      duration: opts.duration / 2,
      callback: ()=>{
        setTimeout(()=>{
          Glow._endAnim (element, opts);
        }, 100);
      }
    });
  }

  static _endAnim (element, opts) {
    if (!opts) opts = { };

    Animation.run ("class-fade-in", element, {
      class: "",
      remClass: "text-highlight",
      duration: opts.duration / 2,
      callback: opts.callback
    });
  }
}
