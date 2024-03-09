document.addEventListener("click", (event) => {
  if (event.ctrlKey && event.target.tagName === "IMG") {
    console.log("Ctrl+click on an image", event.target.src);
    event.preventDefault();
    chrome.runtime.sendMessage({ action: "downloadImage", url: event.target.src });
  }
});