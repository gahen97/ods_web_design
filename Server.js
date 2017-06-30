var path    = require ("path");
var express = require ("express");
var app     = express ();

app.get ("/uset", function (req, res){
	res.sendFile (path.join (__dirname, "/public/ods_video_website/ods_video.html"));
});

app.use (express.static ("./public"));

var PORT = 2402;

app.listen (PORT, function(){
  console.log ("Templated server running from port", PORT + ".");
});
