type ICallback = (container: HTMLElement) => void;

/** Create `MutationObserver` to track element with class `.contentTagText` changes */
export function trackHashtagChange(callbacks: ICallback[]) {
    const observer = new MutationObserver(function (mutationsList) {
        for (const mutation of mutationsList) {
            for (const addedNode of mutation.addedNodes) {
                if (
                    (addedNode as HTMLElement).classList &&
                    (addedNode as HTMLElement).classList.contains('innerContentContainer')
                ) {
                    const contentTag = (addedNode as HTMLElement).querySelector('.contentTagText');

                    if (contentTag) {
                        callbacks.forEach((c) => c(addedNode as HTMLElement));
                    }
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}
