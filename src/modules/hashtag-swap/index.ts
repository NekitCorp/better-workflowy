export class HashtagSwap {
    constructor(
        private swaps: IStorage['swaps'],
        private hotkeysManager: IHotkeysManager,
        private domManager: IDomManager,
    ) {}

    public init() {
        for (const swap of this.swaps) {
            this.hotkeysManager.setHotKey(`${swap.specialKey}+${swap.key}`, () => {
                const activeElement = document.activeElement;

                if (
                    activeElement instanceof HTMLElement &&
                    activeElement.matches('.content[contenteditable]')
                ) {
                    const innerContentContainer =
                        activeElement.querySelector('.innerContentContainer');

                    if (innerContentContainer) {
                        const deleteTags = swap.delete ? swap.delete.trim().split(' ') : [];
                        const insertTags = swap.insert ? swap.insert.trim().split(' ') : [];

                        for (const tag of document.activeElement.querySelectorAll('.contentTag')) {
                            const contentTagText = tag.querySelector('.contentTagText');

                            if (deleteTags.includes(contentTagText.textContent)) {
                                tag.remove();
                            }
                        }

                        for (const tag of insertTags) {
                            innerContentContainer.append(' ');
                            innerContentContainer.append(this.domManager.createHashtag(tag));
                            // remove possible resulting double spaces
                            innerContentContainer.innerHTML =
                                innerContentContainer.innerHTML.replace(/\s{2,}\<span/g, ' <span');
                        }

                        // Reset focus to force save changes in workflowy
                        activeElement.blur();
                        activeElement.focus();
                        this.contenteditableSetCaretAtEnd(activeElement);
                    }
                }
            });
        }
    }

    /**
     * `contenteditable`, set caret at the end of the text.
     * @link https://stackoverflow.com/questions/4233265/contenteditable-set-caret-at-the-end-of-the-text-cross-browser
     */
    private contenteditableSetCaretAtEnd(element: HTMLElement) {
        if (
            typeof window.getSelection !== 'undefined' &&
            typeof document.createRange !== 'undefined'
        ) {
            const range = document.createRange();
            range.selectNodeContents(element);
            range.collapse(false);

            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
}
