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
// A generic onclick callback function.
function genericOnClick(info) {
    console.log("info: ", info);
    if (info.menuItemId === "image") {
        // image item function
        console.log("Image item clicked. Media Type:", info.mediaType);
        // Send a message to the content script to show the modal
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { command: "showModal" });
            }
        );
    }
}
