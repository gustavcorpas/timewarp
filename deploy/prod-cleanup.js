"use strict";
const fs = require("fs");
const path = require('path');
const rimraf = require("rimraf");

const site_root = "/home/travis/build/antonjuulnaber/timewarp/";

//Folders to remove
const dirs = ["deploy", "node_modules"];

//Files to remove
const files = [".travis.yaml"];


function fail(e){
	console.error(e);
	process.exit(1);
}

console.log("Cleaning up");
for(const file of files){
  fs.unlink(site_root + file, e => {if(e) fail(e);});
})

for(const dir of dirs){
  rimraf(site_root + dir, [], e => {if(e) fail(e);});
})