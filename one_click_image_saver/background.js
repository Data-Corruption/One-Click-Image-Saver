chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "downloadImage") {
    const url = request.url;
    console.log("Image URL:", url);
    let cleanedUrl = url.split('?')[0];
    let extension = cleanedUrl.split('.').pop();

    // Handle Twitter image URLs
    if (cleanedUrl.includes("pbs.twimg.com")) {
      const formatParam = url.split('?')[1].split('&').find(param => param.startsWith('format='));
      if (formatParam) {
        extension = formatParam.split('=')[1];
      }
    }

    const timestamp = new Date().toISOString().replace(/[:T]/g, '-').replace(/\..+/, '');
    const filename = `image-${timestamp}.${extension}`;
    console.log("Filename:", filename);
    chrome.downloads.download({
      url: url,
      filename: filename,
      saveAs: false
    });
  }
});