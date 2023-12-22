chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        title: "Edit with BaJOHN's SONS",
        contexts: ["image"], // ContextType
        id: "image", // ID of menu item
    });
});

// A generic onclick callback function.
chrome.contextMenus.onClicked.addListener(genericOnClick);

// A generic onclick callback function.
function genericOnClick(info, tab) {
    console.log("info: ", info);

    if (info.menuItemId === "image") {
        // image item function
        console.log("Image item clicked. Media Type:", info.mediaType);
        // Create a new tab
        chrome.tabs.create({
            url: `../html/imageProcess.html?img=${encodeURIComponent(
                info.srcUrl
            )}`,
        });
    }
}
