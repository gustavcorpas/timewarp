"use strict";
const fs = require("fs");
const minify = require('minify');

minify('index.html').catch((e) => {
	console.error(e);
	process.exit(1)
});