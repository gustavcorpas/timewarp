"use strict";
const minify = require('minify');

minify('../index.html').catch(process.exit(1));