// ==UserScript==
// @name         lanzou剪贴板禁止写入
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http*://*/*
// @icon         https://assets.woozooo.com/assets/favicon.ico
// @grant        none
// ==/UserScript==

function setClipboardText(event) {
	event.preventDefault();
	var result = window.getSelection(0).toString();
	console.log(event.type);

	return false;
};

var url = window.location.href;

var pattern = /(.*).lanzou([a-zA-Z0-9]{1,}).com.*/g;

var test = pattern.test(url)

if (test === true){
    document.addEventListener('copy', function (event) {
	setClipboardText(event);
    });
}
