class DomManager implements IDomManager {
    // <span class="contentTag" title="Filter #text">
    //     #
    //     <span class="contentTagText">text</span>
    //     <span class="contentTagNub" />
    // </span>
    public createHashtag(text: string) {
        const container = document.createElement('span');
        container.className = 'contentTag';
        container.title = `Filter #${text}`;
        container.append('#');

        const contentTagText = document.createElement('span');
        contentTagText.className = 'contentTagText';
        contentTagText.append(text);

        const contentTagNub = document.createElement('span');
        contentTagNub.className = 'contentTagNub';

        container.append(contentTagText);
        container.append(contentTagText);

        return container;
    }

    /** Create `MutationObserver` to track element with class `.contentTagText` changes */
    public trackHashtagChange(callbacks: Array<(container: HTMLElement) => void>) {
        const observer = new MutationObserver(function (mutationsList) {
            for (const mutation of mutationsList) {
                for (const addedNode of mutation.addedNodes) {
                    if (
                        (addedNode as HTMLElement).classList &&
                        (addedNode as HTMLElement).classList.contains('innerContentContainer')
                    ) {
                        const contentTag = (addedNode as HTMLElement).querySelector(
                            '.contentTagText',
                        );

                        if (contentTag) {
                            callbacks.forEach((c) => c(addedNode as HTMLElement));
                        }
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }
}

export const domManager = new DomManager();
