const setKeyBtn = document.getElementById("set-key");
const currentKeySpan = document.getElementById("current-key");
const statusMsg = document.getElementById("status-msg");

// load saved key
chrome.storage.local.get("targetKey", ({ targetKey }) => {
  currentKeySpan.textContent = targetKey || "Not set";
});

setKeyBtn.addEventListener("click", () => {
  statusMsg.textContent = "Press a key...";
  setKeyBtn.disabled = true;

  const listener = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let key = null;
    if (e.ctrlKey) key = "ctrl";
    else if (e.altKey) key = "alt";
    else if (e.shiftKey) key = "shift";
    else if (e.metaKey) key = "meta";
    else key = e.key.toLowerCase(); // fallback to literal key (e.g., 'z', 'f1')

    chrome.storage.local.set({ targetKey: key }, () => {
      currentKeySpan.textContent = key;
      statusMsg.textContent = "Key saved!";
      console.log(`Key set to: ${key}`);
      setTimeout(() => (statusMsg.textContent = ""), 1500);
    });

    window.removeEventListener("keydown", listener);
    setKeyBtn.disabled = false;
  };

  window.addEventListener("keydown", listener, { once: true });
});
