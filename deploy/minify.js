"use strict";
const minify = require('minify');

minify('../index.html').catch(return 1);