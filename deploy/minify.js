"use strict";
const fs = require("fs");
const path = require('path');
const minify = require("minify");

const site_root = "/home/travis/build/antonjuulnaber/timewarp/";

//Must have slashes after, and not before
const site_dirs = ["", "css/", "js/", "data/"];

function fail(e){
	console.error(e);
	process.exit(1);
}

let filesList = [];

for(const dir of site_dirs){
	fs.stat(site_root + dir, e => {
		if(!e){
			fs.readdir(site_root + dir, (e, files) => {	
				for(const file of files){
					let p = path.extname(file).toLowerCase();
					if(p === ".html" || p === ".css" || p === ".js"){
						filesList.push(dir + file);
					}
					console.log("Minifying: " + filesList);
				}
				console.log("Minifying: " + filesList);
			});
			console.log("Minifying: " + filesList);
		}
		console.log("Minifying: " + filesList);
	});
	console.log("Minifying: " + filesList);
}

console.log("Minifying: " + filesList);

for(const file of filesList){
	minify(file).then(minified => {
		fs.writeFile(file, minified, e => {if(e) fail(e);});
		console.log(minified);
	}).catch(e => {fail(e);});
}