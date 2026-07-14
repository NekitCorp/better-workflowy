interface IHotkeysManager {
    ALL_KEYS: string;

    setHotKey(key: string, handler: HotkeyHandler, options?: HotkeyOptions): () => void;
}

type HotkeyHandler = (params: {
    shortcut: string;
    isModifierPressed: boolean;
    isLetterPressed: boolean;
}) => void;

interface HotkeyOptions {
    /**
     * The element to bind the hotkey to.
     * @default undefined
     */
    element?: HTMLElement | undefined;
}
