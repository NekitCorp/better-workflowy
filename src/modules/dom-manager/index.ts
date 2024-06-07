const PAGE_CONTAINER_SELECTOR = '.pageContainer';
const CONTENT_ROW_ELEMENT_CLASS_NAME = 'innerContentContainer';
const TAG_ELEMENT_TEXT_CLASS_NAME = 'contentTagText';

export class DomManager implements IDomManager {
    private subscribers: ((node: HTMLElement) => void)[] = [];

    constructor(private logger: ILogger) {
        const pageContainer = document.querySelector(PAGE_CONTAINER_SELECTOR);

        if (!pageContainer) {
            this.logger.error(`Element ${PAGE_CONTAINER_SELECTOR} not found.`);
            return;
        }

        const observer = new MutationObserver(this.mutationCallback);
        observer.observe(pageContainer, {
            childList: true,
            subtree: true,
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

    public subscribeToContentChanges(callback: (node: HTMLElement) => void) {
        this.subscribers.push(callback);
    }

    private mutationCallback: MutationCallback = (
        mutations: MutationRecord[],
        observer: MutationObserver,
    ): void => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                this.processingChangedNode(node);
            }
        }
    };

    private processingChangedNode(node: Node): void {
        if (!(node instanceof HTMLElement)) {
            return;
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
