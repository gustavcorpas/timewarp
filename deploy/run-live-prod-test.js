"use strict";
const site_root = "/home/travis/build/antonjuulnaber/timewarp/";

const live = require(site_root + "deploy/live-test.js");

live.test("https://timewarp.antonjuulnaber.dk");