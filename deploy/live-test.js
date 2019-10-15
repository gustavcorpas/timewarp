"use strict";

module.exports = {
	
	test: async (host) => {
		const site_root = "/home/travis/build/antonjuulnaber/timewarp/";
		const puppeteer = require("puppeteer");
		const c = require(site_root + "deploy/console.js");
		

		const button1 = "#start.input";
		const button2 = "#end.input";
		const output = "#result.output";


		const browser = await puppeteer.launch();
		const page = await browser.newPage();


		page.on('error', e => {
			c.log("An error occured during page testing: " + e, false);
		});

		page.on('pageerror', e => {
			c.log("An error occured during page testing: " + e, false);
		})

		await page.goto(host).then(() => {
			c.log("Connected to website", true);
		}).catch(e => {
			c.log("Could not connect to website: " + e, false);
		});


		await page.click(button1);
		await page.keyboard.type("425");
		await page.keyboard.press("Enter");

		const result = await page.evaluate(() => document.querySelector("#result.output").value);

		if(result >= 1){
			c.log("Website succesfully recieved input, parsed and created output", true);
		}else{
			c.log("Website did not produce satisfactory output: " + result, false);
		}
	}
}