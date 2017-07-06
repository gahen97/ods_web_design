/*
  Let me tell you a story. Back in the day, say, maybe 10 years ago?
   There was a fox. Named the little guy Joe. What? That's a good name for a fox.
   ANYWAY, Joe was scared of humans and ran off. I haven't seen him since.
*/

class Popup {
  static make () {
    if (Popup.prevPop)
      $(Popup.prevPop).dialog ("close");

    var newPopup = $ (DIALOG_TEMPLATE).clone ();
    Popup.prevPop = newPopup;

    return newPopup;
  }

  constructor(text, opts){
    if (Popup.isRunning) return false;
    Popup.isRunning = true;

    if (!opts) opts = { };

    var msgDiv = $ (MESSAGE_DIV);
    var msgTxt = $ (MESSAGE_TXT, msgDiv);

    msgTxt.val (text);
    msgDiv.removeClass ("hidden");

    this.stylize (msgDiv);

    setTimeout (() => {
      msgDiv.addClass ("hidden");
      Popup.isRunning = false;
    }, opts.length || DEF_MSG_LENGTH);
  }

  stylize ($div){
    return false;
  }
}
