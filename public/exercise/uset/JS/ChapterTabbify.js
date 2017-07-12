/*
  This file will basically handle converting QuestionTypes & Questions into tabs.

  Note that this likely will not change and should be fine ...

  TODO: Should these selectors be moved into DomDefs? Probably?
*/

/*
  var chapters = {
    "Chapter 1": ["mod 1", "mod 2"],
    "Chapter 2": ["mod 3", "mod 4"]
  }
}
*/

var chapters = {
  "Chapter 1": ["mod 1", "mod 2"],
  "Chapter 2": ["<a href='https://www.google.com'> mod 2 </a>", "mod 4"],
}

class ChapterTabbify {
  static addHeader (text, parent) {
    return $("<h3>" + text + "</h3><div class='accordion-sub'></div>").appendTo (parent);
  }

  static subFrom (header) {
    return $(header).next();
  }

  static mainFrom (main) {
    return $("div", main);
  }

  static addToHeader (text, header, data) {
    var parent     = Tabbify.subFrom (header);
    var newElement = $("<div class='question-tab'>" + text + "</div>").appendTo (parent);

    for (var e in data)
      newElement.data (e, data [e]);

    return newElement;
  }

  constructor (options) {
    if (!options)
      options = { };

    this.mainHeader = Tabbify.mainFrom ($("#modules_display"));
    this.eventId    = options.eventId;

    // set up the accordion
    $ (this.mainHeader).accordion ({
      collapsible: true,
      active: false,
      heightStyle: "content",
      classes: {
        "ui-accordion-header": "accordionHeader",
        "ui-accordion-header-collapsed": "accordionHeader",
      }
    });

    // add elements
    this.regenerate (chapters, options);

    //updateSidebarHeadings ();
  }

  regenerate (chapters, options) {
    this.mainHeader.empty ();

    this.headers = [ ];
    this.items   = [ ];

    this.addQuestionTypes (chapters, options, this.mainHeader);
    //this.addEventHandling (this.eventId);

    this.mainHeader.accordion ("option", "active", false);
    this.mainHeader.accordion ("refresh");
  }

  setActiveQuestion (id) {
    var tab = this.items [id];
    if (!tab) return false;

    if (this.activeTab)
      this.activeTab.removeClass ("active-tab");

    this.activeTab = $(tab);
    this.activeTab.addClass ("active-tab");

    return this;
  }

  addQuestionTypes (qTypes, opts, parent) {
    // Take every question type as header
    // Take every question as text
    //var parent = Tabbify.subFrom ($("#questions_display"));

    var data   = { };
    if (!opts) opts = { };

    data.absoluteQuestionNumber = 0;

    for (var key in qTypes) {
      var qType = key;
      var curHeader = Tabbify.addHeader (qType, parent);

      data.chapterId = key;
      this.addQuestions (qTypes [key], curHeader, data, opts);

      //this.headers.push ($ (curHeader) [0]); // DOM, not jQuery
    }

    return this;
  }

  addQuestions (questions, mainHeader, data, opts) {
    if (!data) data = { };
    if (!opts) opts = { };

    var curName;

    var header    = mainHeader;

    for (var key in questions) {
      var q = questions [key];

      var name = q;

      data.questionId = key;

      var newElement = Tabbify.addToHeader (q, header, data);

      this.items.push($ (newElement) [0]); // DOM element, not jQuery

      // increase question number
      if (data.absoluteQuestionNumber || data.absoluteQuestionNumber === 0)
        data.absoluteQuestionNumber ++;
    }

    return this;
  }

  addEventHandling (control, evtId) {
    var e = control.getDomEventHandler (evtId);
    if (!e) return false;

    e.pushArray (this.items);

    return this;
  }
}
