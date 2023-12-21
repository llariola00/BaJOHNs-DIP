// Listen for messages
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.command === "showModal") {
        showModal();
    }
});

function showModal() {
    // Create modal
    let modal = document.createElement("div");
    modal.id = "myModal";
    modal.innerText = "This is a modal";

    // Create style
    let style = document.createElement("style");
    style.innerText = `
        #myModal {
            width: 200px;
            height: 200px;
            background-color: #fff;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
            z-index: 1000;
        }
    `;

    // Append to head
    document.head.appendChild(style);

    // Append to body
    document.body.appendChild(modal);
}
