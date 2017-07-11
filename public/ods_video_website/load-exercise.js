function getExercise () {
  return new Promise ((fulfill, reject)=>{
    var curUrl = window.location;
    var path   = curUrl.pathname;

    // add a '/exercise' to the front to get the exercise from the server
    $.get ("/exercise" + path, fulfill).fail (reject);
  });
}

function populateExercise (data) {
  $("#exercise").html (data);
}

function loadExercise () {
  getExercise().then (populateExercise).catch (function (err) {
    console.error ("COULD NOT LOAD EXERCISE: ", err);
  });
}

loadExercise ();
