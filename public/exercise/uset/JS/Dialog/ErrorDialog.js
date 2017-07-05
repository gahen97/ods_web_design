const DEF_ERROR_BUTTONS = {
  Ok: function(){ $(this).dialog ("close"); }
}

class ErrorDialog extends Popup {
  constructor (text, opts, ...rest) {
    if (!opts) opts = { };

    // NOTE: Can send in {buttons: false} to not have buttons.
    if (!opts.buttons && opts.buttons !== false)
      opts.buttons = DEF_ERROR_BUTTONS;

    super (text, opts, ...rest);
  }

  stylize () {
    //this.$dialog.parent ().addClass ("ui-state-error");
    //$ (".ui-dialog-buttonpane", this.$dialog.parent ()).addClass ("ui-state-error");

    $ (".ui-icon", this.$dialog).removeClass ().addClass ("ui-icon ui-icon-circlesmall-close")
  }
}
