type IHotkey = {
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
