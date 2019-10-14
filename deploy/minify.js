"use strict";
const fs = require("fs");
var path = require('path');
const minify = require("minify");

function fail(e){
	console.error(e);
	process.exit(1);
}

minify("index.html").then(file => {
	fs.writeFile("index.html", file, e => {if(e) fail(e);});
}).catch(e => {fail(e);});


let filesList;
fs.readdir("/", function(err, files){
  filesList = files.filter(function(e){
    return path.extname(e).toLowerCase() === '.html'
  });
  console.log(filesList);
});