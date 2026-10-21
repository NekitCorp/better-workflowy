const SETTINGS_KEYS: Array<keyof IStorage> = ['search', 'time', 'swaps', 'colors'];

/** Local-only flag: each device decides on its own whether to sync */
const SYNC_ENABLED_KEY = 'syncEnabled';

/** Written to sync storage together with settings; its presence means the account has synced settings */
const SYNC_META_KEY = 'syncMeta';

class Storage {
    private readonly defaultStorage: IStorage = {
        search: [],
        time: {
            enabled: true,
            format: 'd',
        },
        swaps: [],
        colors: [],
    };

    public async readStorage(): Promise<IStorage> {
        if (await this.isSyncEnabled()) {
            const syncData = await chrome.storage.sync.get(SETTINGS_KEYS);
            return this.normalize(syncData);
        }

        const localData = await chrome.storage.local.get(SETTINGS_KEYS);
        return this.normalize(localData);
    }

    public async writeStorage(data: IStorage): Promise<void> {
        if (await this.isSyncEnabled()) {
            await this.writeSync(data);
        } else {
            await chrome.storage.local.set(this.pickSettings(data));
        }
    }

    public async isSyncEnabled(): Promise<boolean> {
        const result = await chrome.storage.local.get(SYNC_ENABLED_KEY);
        return result[SYNC_ENABLED_KEY] === true;
    }

    /** Settings previously synced from any device, or `null` if the account has none */
    public async getSyncedSettings(): Promise<ISyncedSettings | null> {
        const syncData = await chrome.storage.sync.get([...SETTINGS_KEYS, SYNC_META_KEY]);
        const meta = syncData[SYNC_META_KEY] as ISyncMeta | undefined;

        if (!meta) {
            return null;
        }

        return { data: this.normalize(syncData), updatedAt: meta.updatedAt };
    }

    /**
     * Turns on sync for this device.
     * `upload` overwrites the account with `data`, `download` takes the settings from the account.
     * Returns the settings now in effect.
     */
    public async enableSync(strategy: 'upload' | 'download', data: IStorage): Promise<IStorage> {
        let result = data;

        if (strategy === 'upload') {
            await this.writeSync(data);
        } else {
            const synced = await this.getSyncedSettings();

            if (synced) {
                result = synced.data;
                // keep a local copy so turning sync off later doesn't lose anything
                await chrome.storage.local.set(this.pickSettings(result));
            } else {
                await this.writeSync(data);
            }
        }

        await chrome.storage.local.set({ [SYNC_ENABLED_KEY]: true });

        return result;
    }

    /** Turns off sync for this device, keeping the synced settings as local ones */
    public async disableSync(): Promise<IStorage> {
        const data = await this.readStorage();

        await chrome.storage.local.set({ ...this.pickSettings(data), [SYNC_ENABLED_KEY]: false });

        return data;
    }

    private async writeSync(data: IStorage): Promise<void> {
        const meta: ISyncMeta = { updatedAt: Date.now() };

        await chrome.storage.sync.set({ ...this.pickSettings(data), [SYNC_META_KEY]: meta });
    }

    private normalize(data: Record<string, unknown>): IStorage {
        return { ...this.defaultStorage, ...this.pickSettings(data) };
    }

    private pickSettings(data: Record<string, unknown>): Partial<IStorage> {
        const result: Record<string, unknown> = {};

        for (const key of SETTINGS_KEYS) {
            if (data[key] !== undefined) {
                result[key] = data[key];
            }
        }

        return result as Partial<IStorage>;
    }
}

export const storage = new Storage();
