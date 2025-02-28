document.addEventListener('DOMContentLoaded', () => {
  const blockCountElement = document.getElementById('blockCount');

  // Get the current block count from storage and display appropriately
  chrome.storage.local.get(['blockCount'], (result) => {
    const count = result.blockCount || 0;
    if (count <= 0) {
      blockCountElement.textContent = `+${Math.abs(count)}`;
    } else {
      blockCountElement.textContent = `-${count}`;
    }
  });
});