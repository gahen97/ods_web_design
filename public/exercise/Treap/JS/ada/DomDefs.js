/*
  Definitons that are specific to dealing with the DOM
*/
const ELEMENT_TEMPLATE = "#template > .element";

const QUESTION_MAIN    = ".questionFrame";

const MODEL_DISPLAY    = "#model";
const MODEL_MAIN       = "#model"
const MODEL_BODY       = ".modelBody";

const TRASH            = "#trash";

const MESSAGE_DIV      = "#messageDiv";
const MESSAGE_TXT      = "#message";

$(()=>{
	// If anything needs to be done when the exercise loads, do it here
		$("#trash").droppable ({
			tolerance: "touch",
			over: function(event, ui ){
				$(this).attr('src', "exercise/uset/images/trashcan_open.png");
			},
			out: function(event, ui ){
				$(this).attr('src', "exercise/uset/images/trashcan.png");
			},
			drop: function() {
				$(this).attr('src', "exercise/uset/images/trashcan.png");
			}
		});
})
