/*
	These contain definitions that are related to the DOM.
	Also contains anything that has to be done on page load.
*/

const ELEMENT_TEMPLATE = "#template > .element";

const QUESTION_MAIN    = ".questionFrame";
const MODEL_DISPLAY    = ".modelDisplay";
const MODEL_MAIN       = "#model"
const MODEL_BODY       = ".modelMain";

const TRASH            = "#trash";

const MESSAGE_DIV      = "#messageDiv";
const MESSAGE_TXT      = "#message";

$(()=>{
	$(TRASH).droppable ({
		tolerance: "touch",
		over: function(event, ui ){
			$(this).attr('src', "exercise/Base/images/trashcan_open.png");
		},
		out: function(event, ui ){
			$(this).attr('src', "exercise/Base/images/trashcan.png");
		},
		drop: function() {
			$(this).attr('src', "exercise/Base/images/trashcan.png");
		}
	});

	// anything else that has to be done on page load
})
