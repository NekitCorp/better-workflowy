import { beforeEach, describe, expect, it, vi } from 'vitest';

function createArea() {
    let items: Record<string, unknown> = {};

    return {
        dump: () => items,
        get: async (keys: string | string[]) => {
            const list = typeof keys === 'string' ? [keys] : keys;
            return Object.fromEntries(list.filter((k) => k in items).map((k) => [k, items[k]]));
        },
        set: async (data: Record<string, unknown>) => {
            items = { ...items, ...structuredClone(data) };
        },
    };
}

const SETTINGS_A: IStorage = {
    search: [{ shortcut: 'shift+1', value: '#today' }],
    time: { enabled: true, format: 'h' },
    swaps: [],
    colors: [{ hashtag: 'red', color: '#000000', background: '#ff0000' }],
};

const SETTINGS_B: IStorage = {
    search: [],
    time: { enabled: false, format: 'd' },
    swaps: [{ shortcut: 'ctrl+1', delete: 'a', insert: 'b' }],
    colors: [],
};

let local: ReturnType<typeof createArea>;
let sync: ReturnType<typeof createArea>;
let storage: typeof import('../index').storage;

beforeEach(async () => {
    local = createArea();
    sync = createArea();
    vi.stubGlobal('chrome', { storage: { local, sync } });
    ({ storage } = await import('../index'));
});

describe('storage', () => {
    it('reads and writes local storage when sync is disabled', async () => {
        await storage.writeStorage(SETTINGS_A);

        expect(await storage.readStorage()).toEqual(SETTINGS_A);
        expect(sync.dump()).toEqual({});
    });

    it('falls back to legacy sync data when there is no sync meta', async () => {
        await sync.set({ colors: SETTINGS_A.colors });

        expect((await storage.readStorage()).colors).toEqual(SETTINGS_A.colors);
        expect(await storage.getSyncedSettings()).toBeNull();
    });

    it('ignores new-format sync data while sync is disabled', async () => {
        await sync.set({ ...SETTINGS_B, syncMeta: { updatedAt: 1 } });
        await local.set(SETTINGS_A);

        expect(await storage.readStorage()).toEqual(SETTINGS_A);
    });

    it('uploads settings when enabling sync', async () => {
        await storage.writeStorage(SETTINGS_A);
        await storage.enableSync('upload', SETTINGS_A);

        expect(await storage.isSyncEnabled()).toBe(true);
        expect((await storage.getSyncedSettings())?.data).toEqual(SETTINGS_A);
    });

    it('downloads settings from the account when enabling sync', async () => {
        await sync.set({ ...SETTINGS_B, syncMeta: { updatedAt: 1 } });
        await storage.writeStorage(SETTINGS_A);

        expect(await storage.enableSync('download', SETTINGS_A)).toEqual(SETTINGS_B);
        expect(await storage.readStorage()).toEqual(SETTINGS_B);
    });

    it('writes to sync storage when sync is enabled', async () => {
        await storage.enableSync('upload', SETTINGS_A);
        await storage.writeStorage(SETTINGS_B);

        expect((await storage.getSyncedSettings())?.data).toEqual(SETTINGS_B);
        expect(local.dump()).not.toHaveProperty('swaps');
    });

    it('keeps synced settings locally when disabling sync', async () => {
        await storage.enableSync('upload', SETTINGS_A);
        await storage.writeStorage(SETTINGS_B);

        expect(await storage.disableSync()).toEqual(SETTINGS_B);
        expect(await storage.isSyncEnabled()).toBe(false);
        expect(await storage.readStorage()).toEqual(SETTINGS_B);
    });

    it('does not enable sync when upload fails', async () => {
        sync.set = async () => {
            throw new Error('QUOTA_BYTES_PER_ITEM quota exceeded');
        };

        await expect(storage.enableSync('upload', SETTINGS_A)).rejects.toThrow('QUOTA');
        expect(await storage.isSyncEnabled()).toBe(false);
    });
});
