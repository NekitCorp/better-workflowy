import hotkeys from 'hotkeys-js';

class HotkeysManager implements IHotkeysManager {
    constructor() {
        // By default hotkeys are not enabled for INPUT, SELECT, TEXTAREA elements.
        hotkeys.filter = function (event) {
            return true;
        };
    }

    public setHotKey(key: string, handler: () => void) {
        hotkeys(key, (event) => {
            // Prevent the default refresh event under WINDOWS system
            event.preventDefault();

            handler();
        });
    }
}

export const hotkeysManager = new HotkeysManager();
