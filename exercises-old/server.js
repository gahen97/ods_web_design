const data       = require("../config").exercises_old;

var path         = require('path');
var pug          = require('pug');
var express      = require('express');
var cookieParser = require("cookie-parser");

var cookie = require("./modules/cookie.js");

var app = express();
const ME   = "./exercises-old"
const ROOT = "/public";

app.set('view engine', 'pug');

app.use(cookieParser())

app.get("/:type/exercise", function(req,res){
	var exercise = require("./modules/" + req.params.type + ".js");
	var render   = pug.compileFile(ME+"/views/" + req.params.type + "/render.pug");

	// ook!
	var cookieName = cookie.getName (req.params.type);
	var exer = exercise.create (render, req.cookies[cookieName]);

	// for use with sllist+: if it has an ook!
	if (typeof (exer) === "object" && exer.ook){
		cookie.send (res, cookieName, exer.ook);
		exer = exer.exercise;
	}

	// send them the exercise
	res.status(200).send(exer);
});

app.get("/:type/reset", function(req, res){
	var exercise = require(ME+"/modules/" + req.params.type + ".js");
	var cookieName = cookie.getName (req.params.type);
	var ook = req.cookies[cookieName];

	cookie.reset (res, cookieName);

	exercise.reset (ook);
	res.sendStatus(200);
})

app.use(express.static(__dirname + ROOT));
console.log(__dirname);

app.listen(data.port, data.host,function(){
	console.log ("Exercise server listening on http://%s:%s", data.host, data.port);
});
