/*
  Events that aren't exercise-specific, exist for all exercises ...
*/

// TODO Global Functions be bad
function parseInput (input) {
  return input.trim ();
}

// When there's an error with da inputs
function inputError ()
{
  var validStr = control.validInputStr;

  if (validStr === "")
    return new ErrorDialog ("Invalid input ::: cannot add new elements ...");

  return new ErrorDialog ("Invalid input ::: Please enter a number between " + validStr);
}

// check if given input is valid
// must be called from context of control object
function inputValid() {
    var input = $ (".modelEntry").val ();

    input = parseInput (input);

    return (this.validInput (input));
}

/* Main Events .... These are the buttons independent of the exercise */
// Move to next question
function onNextBtnClick (elem, evt) {
  if (this.exercise.next() === false)
    new SuccessDialog ("That's all, folks!"); // TODO
  else{
    // set active to null
    this.restart ();
  }
}

// Move to previous question
function onPrevBtnClick (elem, evt) {
  if (this.exercise.prev () === false)
    new ErrorDialog ("I will go this far, and no further!"); // 10 points if you can tell me the reference, eh? TODO
  else{
    // set active to null
    this.restart();
  }
}

// Show answer button
function onShowAnsBtnClick (elem, evt) {
  this.exercise.showAnswer ();
}

// Restart button
function onRestartBtnClick (elem, evt) {
  if (this.exercise.restart() === false)
    new ErrorDialog ("You have broken the space time continuum"); // TODO
  else{
    // set active to null
    this.restart ();
  }
}

/* INPUT. THIS CONTROLS THE BOUNCING + ICON */
function onInputChanged() {
  let enterBtn = $("#button_enter");

  if (!inputValid.apply(this))
    enterBtn.addClass("disabled");
  else{
    enterBtn.removeClass("disabled");
    Animation.run ("show", enterBtn, {effect: "bounce", options: {distance: 7}, duration: 100});
  }
}


/* ANIMATION DURATION BUTTON EVENTS. HANDLE ANIMATION SETTINGS */
function animDurClick (element, evt) {
  AnimationSettings.nextDuration ();
}

/* TAB EVENTS. THESE HANDLE DEALING WITH THE TABBING SYSTEM */
function clickedTab (element, evt)
{
  var data    = $(element).data ();
  var absQNum = data.absoluteQuestionNumber;

  if (!absQNum && absQNum !== 0)
  {
    console.error ("Was not given a question number. Throwing an error. ", element);
    return false;
  }

  this.exercise.goToQuestion (absQNum);
  this.updateActiveQuestion ();
  this.reset ();
  this.enable ();
}



/* GET CORE EVENT HANDLING DATA ... THIS WILL BE MERGED WITH SPECIFIC EVENTS */
function getCoreEvents(){
  return [
    {
      elem: $("#prevArrow"),
      evtsArr: [
        {
          handlingFunction: onPrevBtnClick,
          customEvtName: "prevBtnClick",
          domEvtName: "click"
        }
      ]
    },
    {
      elem: $("#nextArrow"),
      evtsArr: [
        {
          handlingFunction: onNextBtnClick,
          customEvtName: "nextBtnClick",
          domEvtName: "click"
        }
      ]
    },
    {
      elem: $(".showAnswerButton"),
      evtsArr: [
        {
          handlingFunction: onShowAnsBtnClick,
          customEvtName: "showAnsBtnClick",
          domEvtName: "click"
        }
      ]
    },
    {
      elem: $(".redoQuestionButton"),
      evtsArr: [
        {
          handlingFunction: onRestartBtnClick,
          customEvtName: "redoQBtnClick",
          domEvtName: "click"
        }
      ]
    },

    /* INPUT TEXT AREA */
    {
        elem: $(".modelEntry"),
        evtsArr: [
          {
            handlingFunction: onInputChanged,
            customEvtName: "input-change",
            domEvtName: "input"
          }
        ]
    },

    /* ANIMATION DURATION SETTINGS BUTTON EVENTS */
    {
      elem: $("#animationDuration"),
      evtsArr: [
        {
          handlingFunction: animDurClick,
          customEvtName: "nextAnimationDuration",
          domEvtName: "click"
        }
      ]
    },

    /* TAB EVENTS */
    {
      elem: $(".tabbedQuestion"),
      evtsArr: [
        {
          handlingFunction: clickedTab,
          customEvtName: "goToQuestion",
          domEvtName: "click"
        }
      ],
      id: TABS_EVENTS_ID
    },
  ];
}
