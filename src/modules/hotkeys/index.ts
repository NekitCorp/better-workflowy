import hotkeys, { type KeyHandler } from 'hotkeys-js';

export class HotkeysManager implements IHotkeysManager {
    public ALL_KEYS = '*';

    constructor(private logger: ILogger) {
        // By default hotkeys are not enabled for INPUT, SELECT, TEXTAREA elements
        // and contenteditable. Workflowy uses contenteditable, so allow everywhere.
        // https://github.com/jaywcjlove/hotkeys-js#filter
        hotkeys.filter = function () {
            return true;
        };
    }

    public setHotKey(key: string, handler: HotkeyHandler, options: HotkeyOptions = {}): () => void {
        const { element } = options;

        this.logger.log(`Shortcut registration: "${key}".`);

        const keyHandler: KeyHandler = (event) => {
            event.preventDefault();

            const keys = hotkeys.getPressedKeyString();
            const isModifierPressed = keys.some((pressedKey) => hotkeys.modifier[pressedKey]);
            const isLetterPressed = keys.some((pressedKey) => !hotkeys.modifier[pressedKey]);
            const shortcut = keys.join('+');

            this.logger.log(`Hotkey detected: ${key}. Keys: "${shortcut}".`);

            handler({ shortcut, isModifierPressed, isLetterPressed });
        };

        if (element) {
            hotkeys(key, { element }, keyHandler);
        } else {
            hotkeys(key, keyHandler);
        }

        return () => hotkeys.unbind(key, keyHandler);
    }
}
