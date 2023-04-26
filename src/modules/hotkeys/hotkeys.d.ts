interface IHotkeysManager {
    setHotKey(key: string, handler: () => void): void;
}
