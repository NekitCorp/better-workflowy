import setHotkey from "hotkeys-js";
import { defaultStorage, IStorage } from "./storage";
import { createObserver, highlight, renderTotalTime } from "./utils/time";

// By default hotkeys are not enabled for INPUT, SELECT, TEXTAREA elements.
setHotkey.filter = function (event) {
    return true;
};

chrome.storage.sync.get(defaultStorage, ({ filters, calcTotalTime }: IStorage) => {
    // Start calculate total time
    if (calcTotalTime) {
        highlight();
        renderTotalTime();
        createObserver();
    }

    // Start filters by hotkey
    for (const filter of filters) {
        setHotkey(`${filter.specialKey}+${filter.key}`, function (event, handler) {
            // Prevent the default refresh event under WINDOWS system
            event.preventDefault();

            if (filter.hashtags) {
                location.hash =
                    "?q=" + filter.hashtags.split(" ").reduce((acc, val) => `${acc}#${val} `, "");
            } else {
                location.hash = "";
            }
        });
    }
});
