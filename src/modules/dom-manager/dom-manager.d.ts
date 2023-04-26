interface IDomManager {
    createHashtag(text: string): HTMLSpanElement;
    trackHashtagChange(callbacks: ((container: HTMLElement) => void)[]): void;
}
