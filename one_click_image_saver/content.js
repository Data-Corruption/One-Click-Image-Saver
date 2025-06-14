let showedAlert = false;

function getFromStorage(key, fallback = null) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(key, (data) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(data[key] ?? fallback);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

document.addEventListener("click", async (event) => {
  let targetKey;

  try {
    targetKey = await getFromStorage("targetKey", "ctrl");
  } catch (err) {
    if (!showedAlert) {
      alert("⚠️ One-Click Image Saver extension context was invalidated. Please reload this tab for it to work.");
      showedAlert = true;
    }
    console.warn("Storage access failed:", err.message);
    return;
  }

  const keyPressed =
    (targetKey === "ctrl" && event.ctrlKey) ||
    (targetKey === "alt" && event.altKey) ||
    (targetKey === "shift" && event.shiftKey) ||
    (targetKey === "meta" && event.metaKey) ||
    (!["ctrl", "alt", "shift", "meta"].includes(targetKey) &&
      event.key?.toLowerCase() === targetKey);

  if (keyPressed && event.target.tagName === "IMG") {
    event.preventDefault();
    console.log("Saving image:", event.target.src);
    chrome.runtime.sendMessage({ action: "downloadImage", url: event.target.src });
  }
});
