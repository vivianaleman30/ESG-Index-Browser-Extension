chrome.webNavigation.onHistoryStateUpdated.addListener(function() {
    chrome.tabs.executeScript(null, { file: "content_script.js" });
}, {
    //present valid url that causes it to act
	url: [{ hostSuffix: ".amazon.com" }]
});
chrome.webNavigation.onHistoryStateUpdated.addListener(function() {
    chrome.tabs.executeScript(null, { file: "content_script_yelp.js" });
}, {
    //present valid url that causes it to act
	url: [{ hostSuffix: ".yelp.com" }]
});
