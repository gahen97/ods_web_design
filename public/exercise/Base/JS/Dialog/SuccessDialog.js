/*
  Success: Adds a border-color-success border.
*/

class SuccessDialog extends Popup {
    constructor (text, opts, ...rest) {
      if (!opts) opts = { };

      if (!opts.classes) opts.classes = "";
      opts.classes += " color-success";

      super (text, opts, ...rest);
    }
}
