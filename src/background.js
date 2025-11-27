import chrome from 'chrome';
import { getContentTypeHeader } from './backgroundHelpers';

// Reference on detecting MIME type:
// http://stackoverflow.com/a/21042958/341512

const tabsWithImages = {};

const imageMimeTypes = {
  'image/jpeg': true,
  'image/png':  true,
  'image/gif':  true,
  'image/webp': true,
  'video/webm': true
};

const imageExtensions = {
  'jpg':  true,
  'jpeg': true,
  'png':  true,
  'gif':  true,
  'webp': true,
  'webm': true
};

const urlExtensionRegex = /.+\.([^?]+)(\?|$)/;

function matchesImageExtension(url) {
  const urlFileExtension = url.match(urlExtensionRegex);
  if (!urlFileExtension) {
    return false;
  }
  const ext = urlFileExtension[1].toLowerCase();
  return Boolean(imageExtensions[ext]);
}

// Track which tabs are images based on MIME type
chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    if (details.tabId !== -1) {
      const headerValue = getContentTypeHeader(details.responseHeaders);

      // If false, we know tab is not an image, and skip fallback check.
      tabsWithImages[details.tabId] = imageMimeTypes[headerValue] || false;
    }
  },
  {
    urls: ['*://*/*'],
    types: ['main_frame'],
  },
  ['responseHeaders']
);

// Given array of tabs, return URLs of those which are images
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.type === 'checktabs') {
      const tabsToReturn = [];
      const tabs = request.tabs;
      for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        const tabObj = { id: tab.id, url: tab.url };
        const headerStatus = tabsWithImages[tab.id];
        const isImageByExtension = matchesImageExtension(tab.url);

        if (headerStatus === true || (isImageByExtension && headerStatus !== true)) {
          tabsToReturn.push(tabObj);
        }
      }
      sendResponse({ tabs: tabsToReturn });
    }
  }
);
