const PAGE_ELEMENT_CLASS_NAME = 'page';
const CONTENT_ROW_ELEMENT_CLASS_NAME = 'innerContentContainer';
const TAG_ELEMENT_TEXT_CLASS_NAME = 'contentTagText';
const APP_LOAD_TIMEOUT = 30; // seconds

export class DomManager implements IDomManager {
    private resolveLoadingPromise: (() => void) | null = null;
    private subscribers: ((node: HTMLElement) => void)[] = [];

    constructor(private logger: ILogger) {
        const observer = new MutationObserver(this.mutationCallback);
        observer.observe(document.body, { childList: true, subtree: true });
    }

    public loadingApp(): Promise<void> {
        return new Promise((res) => {
            if (document.querySelector(`.${PAGE_ELEMENT_CLASS_NAME}`)) {
                res();
            } else {
                this.startAppLoadWaiting();
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

    /**
     * Start a timer waiting for the app to load.
     */
    private startAppLoadWaiting() {
        let seconds = 0;

        const interval = setInterval(() => {
            seconds += 1;

            if (this.resolveLoadingPromise === null) {
                return clearInterval(interval);
            }

            if (document.querySelector(`.${PAGE_ELEMENT_CLASS_NAME}`)) {
                clearInterval(interval);
                this.resolveLoadingPromise();
                this.resolveLoadingPromise = null;
            }

            if (seconds > APP_LOAD_TIMEOUT) {
                clearInterval(interval);
                this.logger.error(
                    `Failed to wait for the app to load within ${APP_LOAD_TIMEOUT} seconds.`,
                );
            }
        }, 1 * 1000);
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

        // Detect app load
        if (
            this.resolveLoadingPromise !== null &&
            (node.matches(`.${PAGE_ELEMENT_CLASS_NAME}`) ||
                node.querySelector(`.${PAGE_ELEMENT_CLASS_NAME}`))
        ) {
            this.resolveLoadingPromise();
            this.resolveLoadingPromise = null;
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
