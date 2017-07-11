/*
  This basically deals with sending out little messages to users.
    When a new Popup is created, it sets the text of the little dialog box,
    shows the popup (optionally adding classes), and hides it after a few seconds.
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
