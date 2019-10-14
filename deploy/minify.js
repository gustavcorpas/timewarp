"use strict";
const fs = require("fs");
const minify = require("minify");

function fail(e){
	console.error(e);
	process.exit(1);
}

minify("index.html").then(file => {
	fs.writeFile("index.html", "VIRK DOG", e => {if(e) fail(e);});
}).catch(e => {fail(e);});

const content = "Jeg er sej";

fs.writeFile('index.html', content, err => {
  if (err) {
    console.error(err)
    return
  }
  console.log("File written succesfully");
});