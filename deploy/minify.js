"use strict";
const fs = require("fs");
const minify = require("minify");

function fail(e){
	console.error(e);
	process.exit(1);
}

minify("irdex.html").then((file) => {
	fs.writeFile("index.html", file, () => {});
}).catch((e) => {fail(e);});