"use strict";
const fs = require("fs");
const minify = require('minify');

minify('irdex.html').catch((e) => {
	console.error(e);
	process.exit(1)
});