class HighlightDialog extends Popup {
  constructor (text, opts, ...rest) {
    if (!opts) opts = { };

    if (!opts.classes) opts.classes = "";
    opts.classes += " border-color-highlight";

    super (text, opts, ...rest);
  }
}
