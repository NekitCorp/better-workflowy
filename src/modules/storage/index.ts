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

    public readStorage(callback: (data: IStorage) => void): void {
        // for backward compatibility
        chrome.storage.sync.get(null, (syncData) => {
            chrome.storage.local.get(null, (localData) => {
                callback({ ...this.defaultStorage, ...syncData, ...localData });
            });
        });
    }

    public writeStorage(data: IStorage, callback: () => void): void {
        chrome.storage.local.set(data, callback);
    }
}

export const storage = new Storage();
