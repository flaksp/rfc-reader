if (chrome !== undefined) {
  chrome.omnibox.onInputEntered.addListener((text) => {
    chrome.tabs.create({
      url: `https://tools.ietf.org/html/rfc${text}`,
    });
  });
}

if (browser !== undefined) {
  browser.omnibox.onInputEntered.addListener((text) => {
    browser.tabs.create({
      url: `https://tools.ietf.org/html/rfc${text}`,
    });
  });
}
