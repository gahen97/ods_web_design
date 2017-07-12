/*
  TODO: Find better name for this?

  I've been drinking too much!
   Or too little. I forget how it works.
  ANYWAY, I haven't drunk exactly the right amount.
*/

class SuccessDialog extends Popup {
    constructor (text, opts, ...rest) {
      if (!opts) opts = { };

      if (!opts.classes) opts.classes = "";
      opts.classes += " border-color-success";

      super (text, opts, ...rest);
    }
}
