/*
  ERROR: She's my best friend's girl... but she used to be mine
*/
class ErrorDialog extends Popup {
  constructor (text, opts, ...rest) {
    if (!opts) opts = { };

    super (text, opts, ...rest);
  }

  stylize ($div) {
    //this.$dialog.parent ().addClass ("ui-state-error");
    //$ (".ui-dialog-buttonpane", this.$dialog.parent ()).addClass ("ui-state-error");

    $(MESSAGE_TXT, $div).addClass ("border-color-error");
  }
}
