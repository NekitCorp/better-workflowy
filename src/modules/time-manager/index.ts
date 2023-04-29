import { getTagSeconds } from './utils';

export class TimeManager implements ITimeManager {
    private HIGHLIGHT_COLOR = '#13cbd3';
    private COUNTER_ID = 'bw-time-counter';
    private timeCounterElement: HTMLDivElement | null = null;

    constructor(private calcTotalTime: boolean, private domManager: IDomManager) {}

    public init() {
        if (this.calcTotalTime) {
            this.createTimeCounterElement();
            this.highlightTimeHashtag();
            this.renderTotalTime();

            this.domManager.subscribe(this.highlightTimeHashtag);
            this.domManager.subscribe(this.renderTotalTime);
        }
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
            console.error(`[Better WorkFlowy] Elements not found: ".header" or ".breadcrumbs".`);
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

        const days = Math.floor(totalSeconds / 86400);
        if (days > 0) {
            totalSeconds -= days * 86400;
        }

        const hours = Math.floor(totalSeconds / 3600);
        if (hours > 0) {
            totalSeconds -= hours * 3600;
        }

        const minutes = Math.floor(totalSeconds / 60);
        if (minutes > 0) {
            totalSeconds -= minutes * 60;
        }

        const seconds = totalSeconds;

        const totalHtml =
            (days > 0 ? days + 'd ' : '') +
            (hours > 0 ? hours + 'h ' : '') +
            (minutes > 0 ? minutes + 'm ' : '') +
            (seconds > 0 ? seconds + 's' : '');

        this.timeCounterElement.innerHTML = totalHtml;
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
