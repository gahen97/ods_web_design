/*
  Handles the DOM selectors.
*/

const ELEMENT_TEMPLATE = "#template > .element";

const MODEL_DISPLAY    = ".modelDisplay";
const MODEL_MAIN       = "#model"
const MODEL_BODY       = ".modelMain";

const TRASH            = "#trash";

const MESSAGE_DIV      = "#messageDiv";
const MESSAGE_TXT      = "#message";

$(()=>{
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
