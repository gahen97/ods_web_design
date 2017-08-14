/*
  This controls displaying a message to the user.

  Documentation:
    constructor (text : string, opts : Options)
      Displays the message to the user with the given options.
      Arguments:
        text  string   The message to display
        opts  Options  Options for displaying the message. See Options below

    Options
      classes  string  Classes to add for the message, space-separated.
      length   number  The length of time for the message to display.
*/

const HID_CLASS = 'no-visibility'; /// whatever the class is for hidden ..

class Popup {
  constructor(text, opts){
    if (Popup.lastTimeout){
      clearTimeout (Popup.lastTimeout);

      if (Popup.reset)
        Popup.reset ();
    }

    if (!opts) opts = { };

    this.classes = opts.classes || "";

    var msgDiv = $ (MESSAGE_DIV);
    var msgTxt = $ (MESSAGE_TXT, msgDiv);

    msgTxt.val (text);
    msgDiv.removeClass (HID_CLASS);

    this.stylize (msgDiv);

    Popup.reset = () => {
        msgDiv.addClass (HID_CLASS);
        this.removeStyling (msgDiv);
    };

    Popup.lastTimeout = setTimeout (() => {
      Popup.reset ();
    }, opts.length || DEF_MSG_LENGTH);
  }

  stylize ($div){
      $(MESSAGE_TXT, $div).addClass (this.classes);
  }

  removeStyling ($div) {
      $(MESSAGE_TXT, $div).removeClass (this.classes);
  }
}
