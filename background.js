const valorantURLs = [
  'playvalorant.com',
  'valorant.com',
  'riot.com/valorant',
  'riotgames.com/valorant'
];

function showNotification(message) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: 'Valorant No No',
    message: message
  });
}

function incrementBlockCount() {
  chrome.storage.local.get(['blockCount'], (result) => {
    const newCount = (result.blockCount || 0) + 1;
    chrome.storage.local.set({ blockCount: newCount });
  });
}

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const url = new URL(details.url);
  
  if (valorantURLs.some(vUrl => url.hostname.includes(vUrl) || url.pathname.includes('valorant'))) {
    showNotification('Ayo no shot! 💀 Caught you trying to access Valorant! Stay based and remember the grindset fam! 😤');
    
    // Redirect to a reminder page or block the navigation
    incrementBlockCount();
    incrementBlockCount();
    chrome.tabs.update(details.tabId, {
      url: chrome.runtime.getURL('blocked.html')
    });
  }
});

// Listen for installation attempts
chrome.webNavigation.onCommitted.addListener((details) => {
  const url = new URL(details.url);
  
  if (url.pathname.toLowerCase().includes('download') && 
      valorantURLs.some(vUrl => url.hostname.includes(vUrl))) {
    showNotification('Fr fr caught you in 4K trying to download Valorant! Stay woke bestie! 🚫');
    
    incrementBlockCount();
    incrementBlockCount();
    chrome.tabs.update(details.tabId, {
      url: chrome.runtime.getURL('blocked.html')
    });
  }
});