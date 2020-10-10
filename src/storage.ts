import type { IHotkey } from "./utils/keyboard-keys";

export type IStorage = {
    hotkeys: (IHotkey & { hash: string })[];
    calcTotalTime: boolean;
    swapHashtags: {
        from: string;
        to: string;
    };
};
export type ITest = {
    ad: number;
};

export const defaultStorage: IStorage = {
    hotkeys: [],
    calcTotalTime: true,
    swapHashtags: null,
};
