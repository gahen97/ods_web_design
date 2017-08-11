/*
  Definitons that are specific to dealing with the DOM
*/

const ELEMENT_TEMPLATE = "#template > .element";

const QUESTION_MAIN    = ".questionFrame";
const MODEL_DISPLAY    = ".arrayBody";
const MODEL_MAIN       = "#model"
const MODEL_BODY       = ".arrayBody";
const ARRAY_BODY       = ".arrayBody";

const TRASH            = "#trash";

const MESSAGE_DIV      = "#messageDiv";
const MESSAGE_TXT      = "#message";

const ARRAY_CONTAINMENT = ".arrayContainer";

const ELEMENT_X_SPACING = 50;
const ELEMENT_X_START   = 15;
const ELEMENT_Y_OFFSET  = 15;

$(()=>{
	$("#trash").droppable ({
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

	$ (ARRAY_BODY).sortable({
		containment: ARRAY_CONTAINMENT,
		axis: 'x',
		distance: 5,
		grid: [50, 0],
		revert: true
	});
})
