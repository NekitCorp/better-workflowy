interface IDomManager {
    loadingApp(): Promise<void>;
    subscribe(callback: (node: HTMLElement) => void): void;
    createHashtag(text: string): HTMLSpanElement;
}
