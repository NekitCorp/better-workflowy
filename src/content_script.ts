import hotkeys from "hotkeys-js";

hotkeys("ctrl+home", function (event, handler) {
    // Prevent the default refresh event under WINDOWS system
    // event.preventDefault();
    location.hash = "";
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.color) {
        console.log("Receive color = " + msg.color);
        document.body.style.backgroundColor = msg.color;
        sendResponse("Change color to " + msg.color);
    } else {
        sendResponse("Color message is none.");
    }
});
