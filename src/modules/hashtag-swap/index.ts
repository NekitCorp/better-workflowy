export class HashtagSwap {
    constructor(
        private swaps: IStorage['swaps'],
        private hotkeysManager: IHotkeysManager,
        private domManager: IDomManager,
    ) {}

    init() {
        for (const swap of this.swaps) {
            this.hotkeysManager.setHotKey(`${swap.specialKey}+${swap.key}`, () => {
                const activeElement = document.activeElement;
                const innerContentContainer = activeElement.querySelector('.innerContentContainer');

                if (innerContentContainer) {
                    const deleteTags = swap.delete ? swap.delete.split(' ') : [];
                    const insertTags = swap.insert ? swap.insert.split(' ') : [];

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
                        innerContentContainer.innerHTML = innerContentContainer.innerHTML.replace(
                            /\s{2,}\<span/g,
                            ' <span',
                        );
                    }

                    // Reset focus to force save changes in workflowy
                    (activeElement as HTMLElement).blur();
                    (activeElement as HTMLElement).focus();
                }
            });
        }
    }
}
