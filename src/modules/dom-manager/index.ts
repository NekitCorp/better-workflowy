const PAGE_ELEMENT_CLASS_NAME = 'page';
const CONTENT_ROW_ELEMENT_CLASS_NAME = 'innerContentContainer';
const TAG_ELEMENT_TEXT_CLASS_NAME = 'contentTagText';

export class DomManager implements IDomManager {
    private resolveLoadingPromise: (() => void) | null = null;
    private subscribers: ((node: HTMLElement) => void)[] = [];

    constructor() {
        this.observe();
    }

    public loadingApp(): Promise<void> {
        return new Promise((res) => {
            if (document.querySelector(`.${PAGE_ELEMENT_CLASS_NAME}`)) {
                return res();
            } else {
                this.resolveLoadingPromise = res;
            }
        });
    }

    // <span class="contentTag" title="Filter #text" data-val="#text">
    //     #
    //     <span class="contentTagText">text</span>
    //     <span class="contentTagNub" />
    // </span>
    public createHashtag(text: string) {
        const container = document.createElement('span');
        container.className = 'contentTag';
        container.title = `Filter #${text}`;
        container.dataset.val = `#${text}`;
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

    public subscribe(callback: (node: HTMLElement) => void) {
        this.subscribers.push(callback);
    }

    private observe() {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (!(node instanceof HTMLElement)) continue;

                    // Detect app load
                    if (
                        node.matches(`.${PAGE_ELEMENT_CLASS_NAME}`) ||
                        node.querySelector(`.${PAGE_ELEMENT_CLASS_NAME}`)
                    ) {
                        if (this.resolveLoadingPromise) {
                            this.resolveLoadingPromise();
                            this.resolveLoadingPromise = null;
                        }
                    }

                    // Detect any changes on content rows with hashtags
                    if (node.classList.contains(CONTENT_ROW_ELEMENT_CLASS_NAME)) {
                        const contentTag = node.querySelector(`.${TAG_ELEMENT_TEXT_CLASS_NAME}`);

                        if (contentTag) {
                            this.subscribers.forEach((c) => c(node));
                        }
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }
}
