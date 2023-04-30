type IHotkey = {
    specialKey: string;
    key: string;
};

type IStorage = {
    /** Search on hotkey */
    search: Array<IHotkey & { value: string }>;

    /** Calculate total hashtags time */
    calcTotalTime: boolean;

    /** Swap hashtags on hotkey */
    swaps: Array<{ delete: string; insert: string } & IHotkey>;

    /** Hashtag line colors */
    colors: {
        hashtag: string;
        color: string;
        background: string;
    }[];
};
