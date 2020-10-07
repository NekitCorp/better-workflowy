import { createHotKeyBlock } from "./utils/dom";
import { IHotkey } from "./utils/keyboard-keys";

export type IOptions = {
    hotkeys: (IHotkey & { hash: string })[];
    calcTotalTime: boolean;
};

// Saves options to chrome.storage
function saveOptions() {
    const calcTotalTime = (document.getElementById("calc-total-time") as HTMLInputElement).checked;
    const hotkeys = [...document.getElementById("hotkeys").childNodes].map((node) => {
        const specialKey = ((node as HTMLElement).querySelector(".skselect") as HTMLInputElement)
            .value;
        const key = ((node as HTMLElement).querySelector(".kselect") as HTMLInputElement).value;
        const hash = ((node as HTMLElement).querySelector("input") as HTMLInputElement).value;

        return { specialKey, key, hash };
    });

    chrome.storage.sync.set(
        {
            calcTotalTime,
            hotkeys,
        },
        function () {
            // Update status to let user know options were saved.
            var status = document.getElementById("status");
            status.innerText = "Options saved!";
            setTimeout(function () {
                status.textContent = "";
            }, 1500);
        }
    );
}

// Restores options from chrome.storage
function restoreOptions() {
    chrome.storage.sync.get(
        {
            hotkeys: [],
            calcTotalTime: true,
        },
        function ({ hotkeys, calcTotalTime }: IOptions) {
            (document.getElementById(
                "calc-total-time"
            ) as HTMLInputElement).checked = calcTotalTime;

            for (const hotkey of hotkeys) {
                document.getElementById("hotkeys").appendChild(createHotKeyBlock(hotkey));
            }
        }
    );
}

document.getElementById("save").addEventListener("click", saveOptions);
document.getElementById("add-hotkey").addEventListener("click", () => {
    document
        .getElementById("hotkeys")
        .appendChild(createHotKeyBlock({ specialKey: "shift", key: "home", hash: "" }));
});
document.addEventListener("DOMContentLoaded", restoreOptions);
