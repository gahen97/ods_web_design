class HighlightDialog extends Popup {
  constructor (text, opts, ...rest) {
    if (!opts) opts = { };

    super (text, opts, ...rest);
  }

  stylize ($div) {
    //this.$dialog.parent ().addClass ("ui-state-highlight");
    //$ (".ui-dialog-buttonpane", this.$dialog.parent ()).addClass ("ui-state-highlight");

    $(MESSAGE_TXT, $div).addClass ("border-color-highlight");
  }
}
