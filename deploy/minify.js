"use strict";

module.exports = {
	
	run: () => {
		const site_root = "/home/travis/build/antonjuulnaber/timewarp/";

		const fs = require("fs");
		const path = require('path');
		const rimraf = require("rimraf");
		const minify = require("minify");
		const c = require(site_root + "deploy/console.js");


		const remove_dirs = ["deploy", "node_modules"];
		const remove_files = [".travis.yaml"];

		//Must have slashes after, and not before
		const minify_dirs = ["", "css/", "js/", "data/"];


		for(const dir of remove_dirs){
		  c.log("Removing /" + dir);
		  rimraf(site_root + dir, [], e => {if(e) c.log("Could not remove file: " + e, false);});
		}

		for(const file of remove_files){
		  c.log("Removing " + file);
		  fs.unlink(site_root + file, e => {if(e) c.log("Could not remove file: " + e, false);});
		}

		for(const dir of minify_dirs){
			fs.stat(site_root + dir, e => {
				if(!e){
					fs.readdir(site_root + dir, (e, files) => {	
						for(const file of files){
							let p = path.extname(file).toLowerCase();
							if(p === ".html" || p === ".css" || p === ".js"){
								c.log("Minifying " + dir + file);
								minify(site_root + dir + file).then(minified => {
									fs.writeFile(site_root + dir + file, minified, e => {if(e) c.fail(e);});
								}).catch(e => {c.fail(e);});
							}else if(p === ".json"){
								c.log("Minifying " + dir + file);
								fs.readFile(site_root + dir + file, "utf-8", (e, data) => {
									if(e) c.fail(e);
									fs.writeFile(file, JSON.stringify(JSON.parse(data)), e => {if(e) c.fail(e);});
								});
							}
						}
					});
				}
			});
		}
	}
}