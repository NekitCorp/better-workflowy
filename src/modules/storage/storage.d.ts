type IHotkey = {
    /** Full hotkey combo for hotkeys-js, e.g. `shift+1` or `ctrl+shift+a` */
    shortcut: string;
};

/** @deprecated Legacy format kept for storage migration */
type IHotkeyLegacy = {
    specialKey: string;
    key: string;
};

type FormatTime = 'd' | 'h' | 'm' | 's';

type IStorage = {
    /** Search on hotkey */
    search: Array<IHotkey & { value: string }>;

    /** Calculate total hashtags time */
    time: {
        enabled: boolean;
        format: FormatTime;
    };

    /** Swap hashtags on hotkey */
    swaps: Array<{ delete: string; insert: string } & IHotkey>;

    /** Hashtag line colors */
    colors: {
        hashtag: string;
        color: string;
        background: string;
    }[];
};
