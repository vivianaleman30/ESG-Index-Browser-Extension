let btn = document.getElementById("popup_button");

btn.onclick = function(element) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: "\
var items = document.getElementsByClassName('s-item-container');\
for (var i = 0; i < items.length; i++) {\
	items[i].style.backgroundColor = '#00ff00';\
	var name = items[i].getElementsByClassName('a-size-small')[1].innerHTML;\
	console.log(name);\
}"
			}
		);
	});
}
