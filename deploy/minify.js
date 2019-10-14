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

for(const dir of site_dirs){
	fs.stat(site_root + dir, e => {
		if(!e){
			fs.readdir(site_root + dir, (e, files) => {	
				for(const file of files){
					let p = path.extname(file).toLowerCase();
					if(p === ".html" || p === ".css" || p === ".js"){
						minify(dir + file).then(minified => {
							fs.writeFile(dir + file, minified, e => {if(e) fail(e);});
						}).catch(e => {fail(e);});
						console.log("Minifying: " + dir + file);
					}else if(p === ".json"){
						fs.readFile(file, "utf-8", (e, data) => {
							console.log(data);
							if(e) fail(e);
							fs.writeFile(file, JSON.stringify(data), e => {if(e) fail(e);});
						});
						console.log("Minifying: " + dir + file);
					}
				}
			});
		}
	});
}