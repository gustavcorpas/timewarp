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


function fail(e){
	console.error(e);
	process.exit(1);
}


for(const dir of remove_dirs){
  console.log("Removing /" + dir);
  rimraf(site_root + dir, [], e => {if(e) fail(e);});
})

for(const file of remove_files){
  console.log("Removing " + file);
  fs.unlink(site_root + file, e => {if(e) fail(e);});
})

for(const dir of minify_dirs){
	fs.stat(site_root + dir, e => {
		if(!e){
			fs.readdir(site_root + dir, (e, files) => {	
				for(const file of files){
					let p = path.extname(file).toLowerCase();
					if(p === ".html" || p === ".css" || p === ".js"){
						console.log("Minifying " + dir + file);
						minify(site_root + dir + file).then(minified => {
							fs.writeFile(site_root + dir + file, minified, e => {if(e) fail(e);});
						}).catch(e => {fail(e);});
					}else if(p === ".json"){
						console.log("Minifying " + dir + file);
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