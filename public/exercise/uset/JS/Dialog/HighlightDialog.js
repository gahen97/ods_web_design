const DEF_HIGHLIGHT_BUTTONS = {
  Ok: function(){ $(this).dialog ("close"); }
}

class HighlightDialog extends Popup {
  constructor (text, opts, ...rest) {
    if (!opts) opts = { };

    // NOTE: Can send in {buttons: false} to not have buttons.
    if (!opts.buttons && opts.buttons !== false)
      opts.buttons = DEF_HIGHLIGHT_BUTTONS;

    super (text, opts, ...rest);
  }

  stylize () {
    //this.$dialog.parent ().addClass ("ui-state-highlight");
    //$ (".ui-dialog-buttonpane", this.$dialog.parent ()).addClass ("ui-state-highlight");

    $ (".ui-icon", this.$dialog).removeClass ().addClass ("ui-icon ui-icon-notice")
  }
}
