/*
  This file will basically handle converting QuestionTypes & Questions into tabs.

  Note that this likely will not change and should be fine ...

  TODO: Should these selectors be moved into DomDefs? Probably?
<<<<<<< HEAD



    NOTE: Everything works but tab IDs are off.
    As a result, can't setActiveQuestion after initial refresh
=======
>>>>>>> upstream/master
*/

class Tabbify {
  static addHeader (text, parent) {
<<<<<<< HEAD
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
    var newElement = $("<p class='question-tab'>" + text + "</p>").appendTo (parent);

    for (var e in data)
      newElement.data (e, data [e]);

    return newElement;
=======
    var newLi = $("<li class='drop'>" + text +
                  "<ul class='sub' style='display: none;'></ul>" +
                  "</li>")
                  .appendTo (parent);

    return newLi;
  }

  static subFrom (header) {
    return $("> ul", header);
  }

  static addToHeader (text, header, data) {
    var parent = Tabbify.subFrom (header);
    var newLi  = $("<li class='tabbedQuestion'>" + text + "</li>")
                   .appendTo (parent);

    for (var e in data)
      newLi.data (e, data[e]);

    return newLi;
>>>>>>> upstream/master
  }

  constructor (control, options) {
    if (!options)
      options = { };

    this.mainHeader = Tabbify.mainFrom ($("#questions_display"));
    this.eventId    = options.eventId;

    // set up the accordion
    $ (this.mainHeader).accordion ({
      collapsible: true,
      heightStyle: "content",
      classes: {
        "ui-accordion-header": "accordionHeader",
        "ui-accordion-header-collapsed": "accordionHeader",
      }
    });

    // add elements
    this.regenerate (control, options);


    //updateSidebarHeadings ();
  }

  regenerate (control, options) {
    this.mainHeader.empty ();

    this.headers = [ ];
    this.items   = { };

    this.addQuestionTypes (control.exercise, options, this.mainHeader);
    this.addEventHandling (control, this.eventId);

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

  addQuestionTypes (exercise, opts) {
    // Take every question type as header
    // Take every question as text
    var qTypes = exercise.getQuestionTypes ();
    var parent = Tabbify.subFrom ($("#questions_display"));

    var data   = { };
    if (!opts) opts = { };

    data.absoluteQuestionNumber = 0;

    for (var key in qTypes) {
      var qType = qTypes [key];
      //var curHeader = Tabbify.addHeader (qType.name, parent);
      var curHeader = parent;

      data.questionTypeId = key;
      this.addQuestions (qTypes [key], curHeader, data, opts);

      //this.headers.push ($ (curHeader) [0]); // DOM, not jQuery
    }

    return this;
  }

  addQuestions (questionType, mainHeader, data, opts) {
    if (!data) data = { };
    if (!opts) opts = { };

    var questions = questionType.getQuestions ();
    var curName;

    var header    = mainHeader;

    for (var key in questions) {
      var q = questions [key];

      var name = q.name;
      if (name !== curName){
        curName = name;
        header  = Tabbify.addHeader (name, mainHeader);
      }

      data.questionId = key;

      var newElement = Tabbify.addToHeader (q.fullName, header, data);
      this.items[q.getId ()] = $ (newElement) [0]; // DOM element, not jQuery

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
