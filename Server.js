var path    = require ("path");
var fs      = require ("fs");
var promise = require ("promise");
var express = require ("express");
var app     = express ();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get ("/:exerciseName", function (req, res){
	res.render(req.params.exerciseName + "/Exercise", function(err, html) {
	  if (err) {
	    if (err.message.indexOf('Failed to lookup view') !== -1) {
	      return res.sendStatus (404);
	    }
	    throw err;
	  }
	  res.send(html);
	});
});

app.use (express.static ("./public"));
app.use (express.static ("./jquery-ui"));

var PORT = 2402;

app.listen (PORT, function(){
  console.log ("Templated server running from port", PORT + ".");
});
