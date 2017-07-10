/*
  Let me tell you a story. Back in the day, say, maybe 10 years ago?
   There was a fox. Named the little guy Joe. What? That's a good name for a fox.
   ANYWAY, Joe was scared of humans and ran off. I haven't seen him since.
*/

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
    msgDiv.removeClass ("no-visibility");

    this.stylize (msgDiv);

    Popup.reset = () => {
        msgDiv.addClass ("no-visibility");
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
