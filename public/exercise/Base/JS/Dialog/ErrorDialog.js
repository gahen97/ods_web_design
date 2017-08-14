/*
  ERROR: Adds a border-color-error border.
*/

class ErrorDialog extends Popup {
  constructor (text, opts, ...rest) {
    if (!opts) opts = { };

    if (!opts.classes) opts.classes = "";
    opts.classes += " color-error";

    super (text, opts, ...rest);
  }
}
