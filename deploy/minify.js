"use strict";
const fs = require("fs");
const path = require('path');
const minify = require("minify");

//Must have slashes after, and not before
const site_dirs = ["", "css/", "js/", "data/"];

function fail(e){
	console.error(e);
	process.exit(1);
}

let filesList = [];

for(const dir of site_dirs){
	fs.stat(dir, e => {
		if(!e){
			
			fs.readdir(dir, (e, files) => {
				
				/*
				filesList = files.filter(e => {
					return path.extname(e).toLowerCase() === (".html" || ".css" || ".js");
				});
				console.log(filesList);
				*/
				
				for(const file of files){
					let p = path.extname(file).toLowerCase();
					if(p === ".html" || p === ".css" || p === ".js"){
						filesList.push(dir + file);
					}
				}
				console.log(filesList);
			});
			
			
			
		}
	});
}

for(const file of filesList){
	minify(file).then(minified => {
		fs.writeFile(file, minified, e => {if(e) fail(e);});
	}).catch(e => {fail(e);});
}