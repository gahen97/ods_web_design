/*
	Main server code.

	Paths supported:
		/						 Index
		/contents	   Table of Contents
		/:exercise   Sends back the exercise for the given name (views>exercise>Exercise.pug)

	Server is a static server from the public directory.
*/

var path    = require ("path");
var fs      = require ("fs");
var promise = require ("promise");
var express = require ("express");
var app     = express ();

const PORT = 2402;
const HOST = "127.0.0.1";

const INDEX_HTML = "public/index.html";
const TABLE_OF_CONTENTS = "public/video_index.html";

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get("/", function (req, res){
	console.log(req);
	res.sendFile (path.join (__dirname, INDEX_HTML));
});

app.get("/contents", function(req, res){
	res.sendFile (path.join (__dirname, TABLE_OF_CONTENTS));
});

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

app.listen (PORT, HOST, function(){
  console.log ("Templated server running from port", PORT + ".");
});
