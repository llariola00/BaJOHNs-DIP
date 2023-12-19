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
function genericOnClick(info) {
    console.log("info: ", info);
    switch (info.menuItemId) {
        case "image":
            // image item function
            console.log("Image item clicked. Media Type:", info.mediaType);
            break;
        case "video":
            // video item function
            console.log("Video item clicked. Media Type:", info.mediaType);
            break;
        default:
            // Standard context menu item function
            console.log("Standard context menu item clicked.");
    }
}
