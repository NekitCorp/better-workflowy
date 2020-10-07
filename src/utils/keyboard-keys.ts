export type ISpecialKey = typeof specialKeys[any];
export const specialKeys = ["ctrl", "shift", "alt"] as const;

export type IKey = typeof keys[any];
export const keys = [
    "escape",
    "pageup",
    "space",
    "pagedown",
    "end",
    "home",
    "left",
    "up",
    "right",
    "down",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "f1",
    "f2",
    "f3",
    "f4",
    "f5",
    "f6",
    "f7",
    "f8",
    "f9",
    "f10",
    "f11",
    "f12",
] as const;

export type IHotkey = {
    specialKey: ISpecialKey;
    key: IKey;
};
