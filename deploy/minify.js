"use strict";
const fs = require("fs");
const minify = require("minify");

function fail(e){
	console.error(e);
	process.exit(1);
}

minify("index.html").then(file => {
	fs.writeFile("index.html", file, e => {if(e){fail(e)});
}).catch(e => {fail(e);});