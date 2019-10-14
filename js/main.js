"use strict";

function q(query){
	return document.querySelector(query);
}

function p(number){
	return number.toString().padStart(2, '0');
}

async function parsePaste(event){
	let match = (/(\b|\s|\D|^)(?<hour>[01]\d(?=[:;.,_ ])|2[0-3](?=[:;.,_ ])|\d(?=[:;.,_ ])|0(?=[0-5]\d)|[01]\d|2[0-3]|\d)[:;.,_\s]{0,3}(?<minute>[0-5]\d|\d?)(\b|\s|\D|$)/m).exec(event.clipboardData.getData('Text')) || {groups: "hour"};
	let input = document.activeElement;
	
	if(input.tagName == "INPUT" && input.classList.contains("input") && match.groups.hour){
		input.value = p(match.groups.hour) + ":" + p(match.groups.minute||"00");
		input.dispatchEvent(new Event("input"));
	}
}

async function togglePageState(validInput){
	if(validInput){
		document.body.classList.add("foutput");
		document.body.classList.remove("finput");
	}else{
		document.body.classList.remove("foutput");
		document.body.classList.add("finput");
	}
}

async function calculateHours(){
	let startInit = q("input#start").value.split(":", 2);
	let endInit = q("input#end").value.split(":", 2);
	let startRes = Number(startInit[0]) + (Number(startInit[1]) / 60);
	let endRes = Number(endInit[0]) + (Number(endInit[1]) / 60);
	let result = 0;
	if(startRes < endRes){
		result = endRes - startRes;
	}else{
		result = (24 - startRes) + endRes;
	}
	result = Math.round(result * 100) / 100;
	q("#result").value = result.toString().replace(".", ",");
}


async function prepareInputs(){
	let is = document.querySelectorAll("input.input");
	for(let i = 0; i < is.length; i++){
		is[i].addEventListener("input", () => {
			if(validateInputs()){
				calculateHours();
				togglePageState(true);
			}else{
				togglePageState(false);
			}
		});
	}
	document.addEventListener("paste", (event) => {
		event.preventDefault();
		parsePaste(event);
	});
	
	
	let as = [].slice.call(document.querySelectorAll("a"));
	let r = q("#result");
	as.push(r);
	for(let a = 0; a < as.length; a++){
		as[a].addEventListener("keydown", (event) => {
			if(event.key === "Enter"){
				event.preventDefault();
				copyResult();
			}
		});
	}
	q("#copy a").addEventListener("click", () => {
		copyResult();
	});
	
	r.addEventListener("input", () => {
		if(validateInputs()){
			calculateHours();
		}
	});
	r.addEventListener("mouseup", () => {
		setTimeout(() => {r.select();}, 10);
	});
}

async function copyResult(){
	if(!validateInputs()) return;
	
	q("#copy").classList.remove("pressed");
	setTimeout(() => {q("#copy").classList.add("pressed");}, 20);
	
	q("#result").select();
	document.execCommand("copy");
}

function validateInputs(){
	let is = document.querySelectorAll("input.input");
	let valid = true;
	for(let i = 0; i < is.length; i++){
		if(!is[i].value && !is[i].value.match(/^([01]\d|2[0123]|\d):\d{1,2}$/)) valid = false;
	}
	return valid;
}

async function insertTime(){
	let d = new Date();
	d.setMinutes(d.getMinutes() + 1);
	
	q("input#end").value = p(d.getHours()) + ":" + p(d.getMinutes());
}
async function registerServiceWorker(){
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.register("js/sw.js");
	}
}



document.addEventListener("DOMContentLoaded",
	() => {
		prepareInputs();
		insertTime();
		registerServiceWorker();
	}
);