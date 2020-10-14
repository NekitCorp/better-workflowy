import type { IHotkey } from "./keyboard-keys";

export type IStorage = {
    /** Filter by hashtags on hotkey */
    filters: Array<IHotkey & { hashtags: string }>;

    /** Calculate total hashtags time */
    calcTotalTime: boolean;

    /** Swap hashtags on hotkey */
    swapHashtags: {
        delete: string;
        insert: string;
    } & IHotkey;
};

export const defaultStorage: IStorage = {
    filters: [],
    calcTotalTime: true,
    swapHashtags: null,
};
