import { keys, specialKeys } from "./utils/keyboard-keys";

export type IOptions = {
    hotkeys: {
        specialKey: typeof specialKeys[any];
        key: typeof keys[any];
        hash: string;
    }[];
    calcTotalTime: boolean;
};

function createSelect(options: readonly string[], className: string, defaultValue: string) {
    const select = document.createElement("select");
    select.classList.add(className);

    for (const key of options) {
        const option = document.createElement("option");
        option.innerText = key;
        option.value = key;
        select.appendChild(option);
    }

    select.value = defaultValue;

    return select;
}

function createHotKeyBlock(hotkeyOption: IOptions["hotkeys"][0]) {
    const { hash, key, specialKey } = hotkeyOption;

    // Selects
    const specialKeysSelect = createSelect(specialKeys, "skselect", specialKey);
    const keysSelect = createSelect(keys, "kselect", key);

    // Input
    const input = document.createElement("input");
    input.value = hash;

    // Remove button
    const button = document.createElement("button");
    button.classList.add("emoji-button");
    button.innerText = String.fromCodePoint(0x2796);

    // Wrapper
    const div = document.createElement("div");
    div.classList.add("hotkey-block");
    div.appendChild(specialKeysSelect);
    div.appendChild(keysSelect);
    div.appendChild(input);
    div.appendChild(button);

    // Remove listener
    button.addEventListener("click", () => div.remove());

    return div;
}

// Saves options to chrome.storage.sync.
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

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
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
