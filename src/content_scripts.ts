import setHotkey from "hotkeys-js";
import { defaultStorage, IStorage } from "./common/storage";
import { startFiltersOnHotkey, startSwapHashtagsOnHotkey } from "./content_scripts/hotkey";
import { createObserver, highlight, renderTotalTime } from "./content_scripts/time";

// By default hotkeys are not enabled for INPUT, SELECT, TEXTAREA elements.
setHotkey.filter = function (event) {
    return true;
};

chrome.storage.sync.get(defaultStorage, ({ filters, calcTotalTime, swapHashtags }: IStorage) => {
    // Start calculate total time
    if (calcTotalTime) {
        highlight();
        renderTotalTime();
        createObserver();
    }

    startFiltersOnHotkey(filters);

    if (swapHashtags) {
        startSwapHashtagsOnHotkey(swapHashtags);
    }
});
