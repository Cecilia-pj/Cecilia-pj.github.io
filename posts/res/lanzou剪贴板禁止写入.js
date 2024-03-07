// ==UserScript==
// @name         lanzou剪贴板禁止写入
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http*://*/*
// @icon         https://assets.woozooo.com/assets/favicon.ico
// @grant        none
// @downloadURL  https://github.com/Cecilia-pj/Cecilia-pj.github.io/raw/master/posts/res/lanzou%E5%89%AA%E8%B4%B4%E6%9D%BF%E7%A6%81%E6%AD%A2%E5%86%99%E5%85%A5.js
// @updateURL    https://github.com/Cecilia-pj/Cecilia-pj.github.io/raw/master/posts/res/lanzou%E5%89%AA%E8%B4%B4%E6%9D%BF%E7%A6%81%E6%AD%A2%E5%86%99%E5%85%A5.js
// ==/UserScript==

function setClipboardText(event) {
	event.preventDefault();
	var result = window.getSelection(0).toString();
	console.log(event.type);

	return false;
};

var url;

url = window.location.href;

var pattern = /(.*).lanzou([a-zA-Z0-9]{1,}).com.*/g;

var test = pattern.test(url)

if (test === true){
    document.addEventListener('copy', function (event) {
	setClipboardText(event);
    });
}
