/*
  Let me tell you a story. Back in the day, say, maybe 10 years ago?
   There was a fox. Named the little guy Joe. What? That's a good name for a fox.
   ANYWAY, Joe was scared of humans and ran off. I haven't seen him since.
*/

var buttons = {
  No: function () {
    console.log ("LOL NO");
  },
  Yes: function () {
    $ (this).dialog ( "close" );
  }
}

class Popup {
  static make () {
    if (Popup.prevPop)
      $(Popup.prevPop).dialog ("close");

    var newPopup = $ (DIALOG_TEMPLATE).clone ();
    Popup.prevPop = newPopup;

    return newPopup;
  }
  constructor(text, options){
    if (!options) options={ };

    // freedom to rock, freedom to talk - freedom ....
    this.$dialog = Popup.make ();

    if (options.title)
      this.$dialog.attr ("title", options.title);

    $ ("#innerText", this.$dialog).text (text);

    this.$dialog.dialog ({
      buttons: options.buttons,
      close: (...args)=>{ this.onClose (...args); }
    });

    this.stylize ();
  }

  stylize () {
    //$(".ui-button, .ui-dialog-title", this.$dialog.parent()).addClass ();
  }

  onClose () {
    console.log(arguments);
  }
}
