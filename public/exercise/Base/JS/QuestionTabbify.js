/*
  This deals with creating a tabbing system for the Exercise.
  Basically, it handles this by:
    - If a QuestionType is filled with groups of one question, they will be grouped
        by the Question Type's name. (See Binary-Tree)
    - If there are multiple of any Question within a QuestionType, they will
        each be grouped by their Question's name.

  Documentation:
    constructor (control : Control, evtId : string)
      Arguments:
        control  Control  The main Control object for the exercise
        evtId    string   The event handler to add the created elements to

    setActiveQuestion (id : int)
      Purpose: Sets a given question as active, adding a special class.
      Arguments:
        id  int  The ID of the question to set as active.
      Returns: None

*/

/*jshint esversion: 6 */ 'use strict';

class QuestionTabbify {
  /* ---- STATIC MATIC --- */
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
    var parent     = QuestionTabbify.subFrom (header);
    var newElement = $("<div class='question-tab'>" + text + "</div>").appendTo (parent);

    for (var e in data)
      newElement.data (e, data [e]);

    return newElement;
  }

  /* ---- CONSTRUCT ---- */
  constructor (control, evtid) {
    console.trace ();
    console.log (evtid);
    this.mainHeader = QuestionTabbify.mainFrom ($("#questions_display"));
    this.eventId    = evtid;

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
    this._regenerate (control);

    //updateSidebarHeadings ();
  }

  /* ---- PRIVATE ----- */
  _regenerate (control) {
    this.mainHeader.empty ();

    this.headers = [ ];
    this.items   = { };

    this._addQuestionTypes (control.exercise, this.mainHeader);
    this._addEventHandling (control, this.eventId);

    this.mainHeader.accordion ("option", "active", false);
    this.mainHeader.accordion ("refresh");
  }

  _addQuestionTypes (exercise, parent) {
    // Take every question type as header
    // Take every question as text
    var qTypes = exercise.getQuestionTypes ();
    //var parent = Tabbify.subFrom ($("#questions_display"));

    var data   = { };

    data.absoluteQuestionNumber = 0;

    for (var key in qTypes) {
      var qType = qTypes [key];
      //var curHeader = Tabbify.addHeader (qType.name, parent);
      var curHeader = parent;

      data.questionTypeId = key;

      this._calculateHeaderNames (qTypes [key]);
      this._addQuestions (qTypes [key], curHeader, data);

      //this.headers.push ($ (curHeader) [0]); // DOM, not jQuery
    }

    return this;
  }

  _calculateHeaderNames (questionType) {
    var questions  = questionType.getQuestions ();
    var headerType = 1;

    // calculate if we have more than one of any question in the question type
    // if we do, we should label them by the question's name, not the question type's
    for (var q = 1; q < questions.length; q++)
      if (questions [q-1].name === questions[q].name){
        headerType = 2;
        break;
      }

    // give the questions their names based on headerType
    for (var q in questions) {
      var question = questions [q];
      question.headerName = (headerType === 1) ? questionType.name : question.name;
    }
  }

  _addQuestions (questionType, mainHeader, data) {
    if (!data) data = { };

    var questions = questionType.getQuestions ();
    var curName;

    var header    = mainHeader;

    for (var key in questions) {
      var q = questions [key];

      var name = q.headerName;
      if (name !== curName){
        curName = name;
        header  = QuestionTabbify.addHeader (name, mainHeader);
      }

      data.questionId = key;

      var newElement = QuestionTabbify.addToHeader (q.fullName, header, data);
      this.items[q.getId ()] = $ (newElement) [0]; // DOM element, not jQuery

      // increase question number
      if (data.absoluteQuestionNumber || data.absoluteQuestionNumber === 0)
        data.absoluteQuestionNumber ++;
    }

    return this;
  }

  _addEventHandling (control, evtId) {
    var e = control.getDomEventHandler (evtId);
    console.log (e, evtId);
    if (!e) return false;

    console.log (this.items);
    e.pushArray (this.items);

    return this;
  }


  /* ---- PUBLIC ----- */
  setActiveQuestion (id) {
    var tab = this.items [id];
    if (!tab) return false;

    if (this.activeTab)
      this.activeTab.removeClass ("active-tab");

    this.activeTab = $(tab);
    this.activeTab.addClass ("active-tab");

    return this;
  }
}
