"use strict";
const minify = require('minify');

minify('../index.html').catch((e) => {
	console.warn(e);
	process.exit(1)
});