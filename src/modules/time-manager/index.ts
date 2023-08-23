import { formatTime, getTagSeconds } from './utils';

export class TimeManager implements ITimeManager {
    private HIGHLIGHT_COLOR = '#13cbd3';
    private COUNTER_ID = 'bw-time-counter';
    private timeCounterElement: HTMLDivElement | null = null;

    constructor(
        private format: FormatTime,
        private domManager: IDomManager,
        private logger: ILogger,
    ) {}

    public init() {
        this.createTimeCounterElement();
        this.highlightTimeHashtag();
        this.renderTotalTime();

        this.domManager.subscribe(this.highlightTimeHashtag);
        this.domManager.subscribe(this.renderTotalTime);
    }

    private createTimeCounterElement() {
        // Try find already added counter
        const counter = document.getElementById(this.COUNTER_ID);

        if (counter instanceof HTMLDivElement) {
            this.timeCounterElement = counter;
            return;
        }

        // Try find header
        const header = document.querySelector('.header');
        const breadcrumbs = header.querySelector('.breadcrumbs');

        if (!header || !breadcrumbs) {
            this.logger.error(`Elements not found: ".header" or ".breadcrumbs".`);
            return;
        }

        // Create counter div element
        const div = document.createElement('div');

        div.id = this.COUNTER_ID;
        div.style.fontSize = 13 + 'px';
        div.style.marginRight = 10 + 'px';

        header.insertBefore(div, breadcrumbs.nextSibling);

        this.timeCounterElement = div;
    }

    /**
     * Render total recognized time in header
     */
    private renderTotalTime = () => {
        if (this.timeCounterElement === null) {
            return;
        }

        // Calculate total time
        const tags = [...document.querySelectorAll('.contentTag')].map(
            (el: HTMLElement) => el.innerText,
        );
        let totalSeconds = tags.reduce((acc, val) => acc + getTagSeconds(val), 0);

        // Render total time
        this.timeCounterElement.innerHTML = formatTime(totalSeconds, this.format);
    };

    /**
     * Highlight recognized time tags
     */
    private highlightTimeHashtag = () => {
        const tags = document.querySelectorAll('.contentTag');

        for (const tag of tags) {
            if (getTagSeconds((tag as HTMLElement).innerText) > 0) {
                (tag as HTMLElement).style.outline = `1px dashed ${this.HIGHLIGHT_COLOR}`;
            }
        }
    };
}
