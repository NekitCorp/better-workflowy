import { IOptions } from "../options";
import { keys, specialKeys } from "./keyboard-keys";

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

export function createHotKeyBlock(hotkeyOption: IOptions["hotkeys"][0]) {
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
