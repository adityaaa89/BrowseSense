export async function loadHistoryFromStorage() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['browsesense-history'], (result) => {
      resolve(result['browsesense-history'] || []);
    });
  });
}

export async function refreshHistory() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'refresh-history' }, (response) => {
      resolve(response?.data || []);
    });
  });
}
