var path    = require ("path");
var express = require ("express");
var app     = express ();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get ("/:exerciseName", function (req, res){
	res.render (req.params.exerciseName + "/Exercise");
});

app.use (express.static ("./public"));
app.use (express.static ("./jquery-ui"));

var PORT = 2402;

app.listen (PORT, function(){
  console.log ("Templated server running from port", PORT + ".");
});
