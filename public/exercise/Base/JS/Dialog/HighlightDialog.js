/*
  HIGHLIGHT: Adds a color-highlight class.
*/

class HighlightDialog extends Popup {
  constructor (text, opts, ...rest) {
    if (!opts) opts = { };

    if (!opts.classes) opts.classes = "";
    opts.classes += " color-highlight";

    super (text, opts, ...rest);
  }
}
