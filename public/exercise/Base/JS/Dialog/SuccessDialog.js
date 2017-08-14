/*
  Success: Adds a color-success class.
*/

class SuccessDialog extends Popup {
    constructor (text, opts, ...rest) {
      if (!opts) opts = { };

      if (!opts.classes) opts.classes = "";
      opts.classes += " color-success";

      super (text, opts, ...rest);
    }
}
