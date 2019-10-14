"use strict";
const fs = require("fs");
const path = require('path');
const rimraf = require("rimraf");
const minify = require("minify");

const site_root = "/home/travis/build/antonjuulnaber/timewarp/";

const remove_dirs = ["deploy", "node_modules"];
const remove_files = [".travis.yaml"];

//Must have slashes after, and not before
const minify_dirs = ["", "css/", "js/", "data/"];


function log(msg, type){
	type = type || "passed";
	if(type === true) type = "passed";
	if(type === false) type = "failed";
	switch(type){
		case "passed":
			console.log("%c+ " + msg, "color:green");
			break;
		case "failed":
			console.error("%c- " + msg, "color:red");
			break;
		case "warning":
			console.error("%c! " + msg, "color:yellow");
			break;
		default:
			console.log("  " + msg);
			break;
	}
}

function fail(e){
	log(e, "failed");
	process.exit(1);
}


for(const dir of remove_dirs){
  log("Removing /" + dir);
  rimraf(site_root + dir, [], e => {if(e) log("Could not remove file: " + e, false);});
}

for(const file of remove_files){
  log("Removing " + file);
  fs.unlink(site_root + file, e => {if(e) log("Could not remove file: " + e, false);});
}

for(const dir of minify_dirs){
	fs.stat(site_root + dir, e => {
		if(!e){
			fs.readdir(site_root + dir, (e, files) => {	
				for(const file of files){
					let p = path.extname(file).toLowerCase();
					if(p === ".html" || p === ".css" || p === ".js"){
						log("Minifying " + dir + file);
						minify(/*site_root + dir + file*/wham.html).then(minified => {
							fs.writeFile(site_root + dir + file, minified, e => {if(e) fail(e);});
						}).catch(e => {fail(e);});
					}else if(p === ".json"){
						log("Minifying " + dir + file);
						fs.readFile(site_root + dir + file, "utf-8", (e, data) => {
							if(e) fail(e);
							fs.writeFile(file, JSON.stringify(JSON.parse(data)), e => {if(e) fail(e);});
						});
					}
				}
			});
		}
	});
}