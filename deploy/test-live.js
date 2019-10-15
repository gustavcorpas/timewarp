"use strict";

/*

const puppeteer = require("puppeteer");

const host = "https://antonjuulnaber.dk";

const button1 = "#start.input";
const button2 = "#end.input";
const output = "#result.output";


const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto(host);

page.on('error', e => {
	console.log('error happen at the page: ' + e);
});

page.on('pageerror', e => {
	console.log('pageerror occurred: ' + e);
})

await page.click(button1);
await page.keyboard.type("425");
await page.keyboard.press("Enter");

const result = await page.evaluate(() => document.querySelector("#result.output").value);

if(result >= 1){
	console.log("Success");
}else{
	consolge.log("not success");
}*/