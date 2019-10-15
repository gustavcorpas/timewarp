"use strict";


const puppeteer = require("puppeteer");

const host = "https://timewarp.antonjuulnaber.dk";

const button1 = "#start.input";
const button2 = "#end.input";
const output = "#result.output";


const browser =  puppeteer.launch();
const page =  browser.newPage();


page.on('error', e => {
	log("An error occured during page testing: " + e, false);
});

page.on('pageerror', e => {
	log("An error occured during page testing: " + e, false);
})

 page.goto(host).then(
	log("Connected to website", true);
).catch(e => {
	log("Could not connect to website: " + e, false);
});


 page.click(button1);
 page.keyboard.type("425");
 page.keyboard.press("Enter");

const result =  page.evaluate(() => document.querySelector("#result.output").value);

if(result >= 1){
	log("Website succesfully recieved input, parsed and created output", true);
}else{
	log("Website did not produce satisfactory output", false);
}