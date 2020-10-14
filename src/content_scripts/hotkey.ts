import setHotkey from "hotkeys-js";
import type { IStorage } from "../common/storage";
import { createHashtag } from "./dom";

export function startFiltersOnHotkey(filters: IStorage["filters"]) {
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
}

export function startSwaps(swaps: IStorage["swaps"]) {
    for (const swap of swaps) {
        setHotkey(`${swap.specialKey}+${swap.key}`, function (event, handler) {
            // Prevent the default refresh event under WINDOWS system
            event.preventDefault();

            const activeElement = document.activeElement;
            const innerContentContainer = activeElement.querySelector(".innerContentContainer");

            if (innerContentContainer) {
                const deleteTags = swap.delete ? swap.delete.split(" ") : [];
                const insertTags = swap.insert ? swap.insert.split(" ") : [];

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

                // Reset focus to force save changes in workflowy
                (activeElement as HTMLElement).blur();
                (activeElement as HTMLElement).focus();
            }
        });
    }
}
