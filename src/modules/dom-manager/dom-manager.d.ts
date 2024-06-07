interface IDomManager {
    subscribeToContentChanges(callback: (node: HTMLElement) => void): void;
    createHashtag(text: string): HTMLSpanElement;
}
