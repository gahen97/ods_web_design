/*
  ERROR: She's my best friend's girl... but she used to be mine
*/
class ErrorDialog extends Popup {
  constructor (text, opts, ...rest) {
    if (!opts) opts = { };

    if (!opts.classes) opts.classes = "";
    opts.classes += " border-color-error";

    super (text, opts, ...rest);
  }
}
