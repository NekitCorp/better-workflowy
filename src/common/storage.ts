import type { IHotkey } from './keyboard-keys';

export type IStorage = {
    /** Filter by hashtags on hotkey */
    filters: Array<IHotkey & { hashtags: string }>;

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

const defaultStorage: IStorage = {
    filters: [],
    calcTotalTime: true,
    swaps: [],
    colors: [],
};

export function readStorage(callback: (data: IStorage) => void): void {
    // for backward compatibility
    chrome.storage.sync.get(null, (syncData) => {
        chrome.storage.local.get(null, (localData) => {
            callback({ ...defaultStorage, ...syncData, ...localData });
        });
    });
}

export function writeStorage(data: IStorage, callback: () => void): void {
    chrome.storage.local.set(data, callback);
}
