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
var fork = require('child_process').fork;
var express = require ("express");
var app     = express ();

const config      = require ("./config");
const config_self = config.main;
const config_ex   = config.exercises_old;
const config_h5p  = config.h5p;

// Port & Hostname to use for this server
const PORT = config_self.port;
const HOST = config_self.host;

// URL (Host + Port) for the H5P Server
const H5P_URL = config_h5p.host + ":" + config_h5p.port;

// Exercise server Host & Port
const EXERCISE_HOST = config_ex.host;
const EXERCISE_PORT = config_ex.port;

const INDEX_HTML = "public/index.html";
const TABLE_OF_CONTENTS = "public/video_index.html";


// Start our other servers up ...
var old_exercises = require('./exercises-old/server.js');
var h5pServer     = require('./h5p_server/lib/h5p-server.js');
new h5pServer ().start ();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get("/", function (req, res){
	res.sendFile (path.join (__dirname, INDEX_HTML));
});

app.get("/contents", function(req, res){
	res.sendFile (path.join (__dirname, TABLE_OF_CONTENTS));
});

app.get ("/:exerciseName", function (req, res){
	res.render(req.params.exerciseName + "/Exercise",
	{
		h5pUrl: H5P_URL,
	  exercise: {
		 host: EXERCISE_HOST,
		 port: EXERCISE_PORT
		}
	},
	function(err, html) {
	  if (err) {
	    if (err.message.indexOf('Failed to lookup view') !== -1) {
	      return res.sendStatus (404);
	    }
	    throw err;
	  }
	  res.send(html);
	});

	// going to need a proxy here to load exercises from the other server
});

app.use (express.static ("./public"));
app.use (express.static ("./jquery-ui"));

app.listen (PORT, HOST, function(){
  console.log ("Main server running from http://%s:%s/", HOST, PORT);
  console.log ("H5P server running from http://%s", H5P_URL);
});
