/*
  The setup should be along the lines of:
      <div id="accordion">
        <h3>First header</h3>
        <div>First content panel</div>
        <h3>Second header</h3>
        <div>Second content panel</div>
      </div>

    Pairs of headers -> content. Header->content. Header->content.
    So in terms of tabs, this would be:
    <div id="accordion"> <!-- THIS WOULD BE THE MAIN THING -->
      <h3>QuestionType</h3>
      <div> <!-- THIS WOULD ALSO BE AN ACCORDION -->
        <h3>Add</h3>
        <div>
          <h3>ADD 1</h3>
          <h3>ADD 2</h3>
        </div>
        <h3>Find</h3>
        <div>
          <h3>FIND 1</h3>
          <h3>FIND 2</h3>
        </div>
        <h3>Remove</h3>
        <div>
          <h3>REMOVE 1</h3>
          <h3>REMOVE 2</h3>
        </div>
      </div>
    </div>

*/

function addHeader (text, parent) {
  return $("<h3>" + text + "</h3><div class='accordion-sub'></div>").appendTo (parent);
}

function subFrom (header) {
  return $("div.accordion-sub", header);
}

function addToHeader (text, header, data) {
  var parent     = Tabbify.subFrom (header);
  var newElement = $("<h3>" + text + "</h3>").appendTo (parent);

  for (var e in data)
    newElement.data (e, data [e]);

  return newElement;
}
