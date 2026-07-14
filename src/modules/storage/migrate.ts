type LegacySearchItem = Partial<IHotkey & IHotkeyLegacy> & { value: string };
type LegacySwapItem = Partial<IHotkey & IHotkeyLegacy> & { delete: string; insert: string };

export function migrateHotkey(item: LegacySearchItem): IHotkey & { value: string };
export function migrateHotkey(item: LegacySwapItem): IHotkey & { delete: string; insert: string };
export function migrateHotkey<T extends Partial<IHotkey & IHotkeyLegacy>>(
    item: T,
): Omit<T, 'specialKey' | 'key'> & IHotkey {
    if (item.shortcut) {
        const { specialKey: _specialKey, key: _key, ...rest } = item;
        return { ...rest, shortcut: item.shortcut };
    }

    if (item.specialKey && item.key) {
        const { specialKey, key, ...rest } = item;
        return { ...rest, shortcut: `${specialKey}+${key}` };
    }

    const { specialKey: _specialKey, key: _key, ...rest } = item;
    return { ...rest, shortcut: item.shortcut ?? '' };
}

export function migrateStorage(data: IStorage): IStorage {
    return {
        ...data,
        search: (data.search as LegacySearchItem[]).map((item) => migrateHotkey(item)),
        swaps: (data.swaps as LegacySwapItem[]).map((item) => migrateHotkey(item)),
    };
}
