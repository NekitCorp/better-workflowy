const PAGE_ELEMENT_CLASS_NAME = 'page';
const APP_LOAD_TIMEOUT = 30; // seconds

export class AppLoader {
    private resolveLoadingPromise: (() => void) | null = null;
    private observer: MutationObserver;

    constructor(private logger: ILogger) {
        this.observer = new MutationObserver(this.mutationCallback);
        this.observer.observe(document.body, { childList: true, subtree: true });
    }

    public wait(): Promise<void> {
        return new Promise((res) => {
            if (document.querySelector(`.${PAGE_ELEMENT_CLASS_NAME}`)) {
                this.observer.disconnect();
                res();
            } else {
                this.startAppLoadWaiting();
                this.resolveLoadingPromise = res;
            }
        });
    }

    private mutationCallback: MutationCallback = (
        mutations: MutationRecord[],
        observer: MutationObserver,
    ): void => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
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
                    this.observer.disconnect();
                }
            }
        }
    };

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
}
