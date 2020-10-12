import setHotkey from "hotkeys-js";
import { defaultStorage, IStorage } from "./storage";
import { createHashtag } from "./utils/dom";
import { createObserver, highlight, renderTotalTime } from "./utils/time";

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

    // Start swap hashtags on hotkey
    if (swapHashtags) {
        setHotkey(`${swapHashtags.specialKey}+${swapHashtags.key}`, function (event, handler) {
            // Prevent the default refresh event under WINDOWS system
            event.preventDefault();

            const innerContentContainer = document.activeElement.querySelector(
                ".innerContentContainer"
            );

            if (innerContentContainer) {
                const deleteTags = swapHashtags.delete ? swapHashtags.delete.split(" ") : [];
                const insertTags = swapHashtags.insert ? swapHashtags.insert.split(" ") : [];

                for (const tag of document.activeElement.querySelectorAll(".contentTag")) {
                    const contentTagText = tag.querySelector(".contentTagText");

                    if (deleteTags.includes(contentTagText.textContent)) {
                        tag.remove();
                    }
                }

                for (const tag of insertTags) {
                    innerContentContainer.append(" ");
                    innerContentContainer.append(createHashtag(tag));
                    // remove possible resulting double spaces
                    innerContentContainer.innerHTML = innerContentContainer.innerHTML.replace(
                        /\s{2,}\<span/g,
                        " <span"
                    );
                }
            }
        });
    }
});
