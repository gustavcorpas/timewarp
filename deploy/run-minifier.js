"use strict";
const site_root = "/home/travis/build/antonjuulnaber/timewarp/";

const console = require(site_root + "deploy/console.js");
const minify = require(site_root + "deploy/minify.js");

minify.run();