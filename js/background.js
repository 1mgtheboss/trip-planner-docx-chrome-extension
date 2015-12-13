// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when the user is in Google Maps
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostPrefix: 'www.google.', schemes: ['https'], urlContains: 'maps'  },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab){
		var queryInfo = { active: true, currentWindow: true };
		chrome.tabs.query(queryInfo, function(tabs) {
		var tab = tabs[0];
		var title = tab.title;
		//alert(title);
		//Download
		title="<html xmlns:office=\"urn:schemas-microsoft-com:office:office\" xmlns:word=\"urn:schemas-microsoft-com:office:word\" xmlns=\"http://www.w3.org/TR/REC-html40\"><head><xml> <word:WordDocument> <word:View>Print</word:View> <word:Zoom>100</word:Zoom> <word:DoNotOptimizeForBrowser/> </word:WordDocument> </xml></head><body><b>"+title+"</b></body></html>";
		chrome.downloads.download({
  url: "data:text/html," + encodeURIComponent(title),
  filename: "Test.doc"
});
		});
});
