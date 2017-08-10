/*
  HIGHLIGHT: Adds a border-color-highlight border.
*/

class HighlightDialog extends Popup {
  constructor (text, opts, ...rest) {
    if (!opts) opts = { };

    if (!opts.classes) opts.classes = "";
    opts.classes += " color-highlight";

    super (text, opts, ...rest);
  }
}
