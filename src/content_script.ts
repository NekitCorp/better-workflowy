import setHotkey from "hotkeys-js";

setHotkey.filter = function (event) {
    return true;
};

chrome.storage.sync.get(
    {
        hotkeys: [],
        calcTotalTime: true,
    },
    function ({ hotkeys, calcTotalTime }: IOptions) {
        console.log(hotkeys);
        for (const hotkey of hotkeys) {
            setHotkey(`${hotkey.specialKey}+${hotkey.key}`, function (event, handler) {
                // Prevent the default refresh event under WINDOWS system
                event.preventDefault();

                if (hotkey.hash) {
                    location.hash = `?q=#${hotkey.hash} `;
                } else {
                    location.hash = "";
                }
            });
        }
    }
);

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.color) {
        console.log("Receive color = " + msg.color);
        document.body.style.backgroundColor = msg.color;
        sendResponse("Change color to " + msg.color);
    } else {
        sendResponse("Color message is none.");
    }
});
