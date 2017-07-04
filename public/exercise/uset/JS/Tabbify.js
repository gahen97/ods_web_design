/*
  This file will basically handle converting QuestionTypes & Questions into tabs
*/

class Tabbify {
  static addHeader (text, parent) {
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
  }

  constructor (control, options) {
    if (!options)
      options = { };

    this.headers = [ ];
    this.items   = { };

    this.addQuestionTypes (control.exercise, options);
    this.addEventHandling (control, options.eventId);

    updateSidebarHeadings ();
  }

  setActiveQuestion (question) {
    var id = question.getId ();
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
      var curHeader = Tabbify.addHeader (qType.name, parent);

      data.questionTypeId = key;
      this.addQuestions (qTypes [key], curHeader, data);

      this.headers.push ($ (curHeader) [0]); // DOM, not jQuery
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
        header  = Tabbify.addHeader (name, Tabbify.subFrom (mainHeader));
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
