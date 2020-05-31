let count = 0;

const queryInfo = {
    active: true,
    currentWindow: true,
};

chrome.tabs.query(queryInfo, function (tabs) {
    document.getElementById("url").innerText = tabs[0].url;
    document.getElementById("time").innerText = new Date().toLocaleString();
});

chrome.browserAction.setBadgeText({ text: count.toString() });
document.getElementById("countUp").addEventListener("click", () => {
    chrome.browserAction.setBadgeText({ text: (++count).toString() });
});

document.getElementById("changeBackground").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log("click!");
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                color: "red",
            },
            function (msg) {
                console.log("result message:", msg);
            }
        );
    });
});
