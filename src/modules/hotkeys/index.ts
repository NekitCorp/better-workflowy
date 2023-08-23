import hotkeys from 'hotkeys-js';

export class HotkeysManager implements IHotkeysManager {
    constructor(private logger: ILogger) {
        // By default hotkeys are not enabled for INPUT, SELECT, TEXTAREA elements.
        hotkeys.filter = function (event) {
            return true;
        };
    }

    public setHotKey(key: string, handler: () => void) {
        hotkeys(key, (event) => {
            // Prevent the default refresh event under WINDOWS system
            event.preventDefault();

            this.logger.log(`Hotkey detected: ${key}`);

            handler();
        });
    }
}
