const STORAGE_KEY = 'browsesense-history';

async function collectHistory() {
  const endTime = Date.now();
  const startTime = endTime - 1000 * 60 * 60 * 24 * 14;

  const historyItems = await chrome.history.search({
    text: '',
    startTime,
    endTime,
    maxResults: 500,
  });

  const normalized = historyItems
    .filter((item) => item.url && item.title)
    .map((item) => ({
      id: `${item.lastVisitTime || Date.now()}-${item.url}`,
      url: item.url,
      title: item.title,
      visitTime: item.lastVisitTime || Date.now(),
      visitCount: item.visitCount || 1,
      timestamp: item.lastVisitTime || Date.now(),
    }));

  await chrome.storage.local.set({ [STORAGE_KEY]: normalized });
  return normalized;
}

chrome.runtime.onInstalled.addListener(() => {
  collectHistory().catch(() => {});
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === 'refresh-history') {
    collectHistory()
      .then((data) => sendResponse({ success: true, data }))
      .catch((error) => sendResponse({ success: false, error: error.message }));
    return true;
  }

  if (message?.type === 'get-history') {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      sendResponse({ success: true, data: result[STORAGE_KEY] || [] });
    });
    return true;
  }

  return false;
});
