"use strict";

module.exports = {
	
	test: async (host) => {
		const site_root = "/home/travis/build/antonjuulnaber/timewarp/";
		const puppeteer = require("puppeteer");
		const puppeteer = require(site_root + "deploy/console.js");
		

		const button1 = "#start.input";
		const button2 = "#end.input";
		const output = "#result.output";


		const browser = await puppeteer.launch();
		const page = await browser.newPage();


		page.on('error', e => {
			log("An error occured during page testing: " + e, false);
		});

		page.on('pageerror', e => {
			log("An error occured during page testing: " + e, false);
		})

		await page.goto(host).then(() => {
			log("Connected to website", true);
		}).catch(e => {
			log("Could not connect to website: " + e, false);
		});


		await page.click(button1);
		await page.keyboard.type("425");
		await page.keyboard.press("Enter");

		const result = await page.evaluate(() => document.querySelector("#result.output").value);

		if(result >= 1){
			log("Website succesfully recieved input, parsed and created output", true);
		}else{
			log("Website did not produce satisfactory output", false);
		}
	}
}