chrome.webNavigation.onHistoryStateUpdated.addListener(function() {
    chrome.tabs.executeScript(null, { file: "content_script.js" });
}, {
	url: [{ hostSuffix: ".amazon.com" }]
});
