import { getTagSeconds } from './utils';

export class TimeManager implements ITimeManager {
    private HIGHLIGHT_COLOR = '#13cbd3';
    private COUNTER_ID = 'cte-counter';

    constructor(private calcTotalTime: boolean) {}

    public init() {
        if (this.calcTotalTime) {
            this.highlightTimeHashtag();
            this.renderTotalTime();
        }
    }

    /**
     * Render total recognized time in header
     */
    public renderTotalTime = () => {
        // Try find header
        const header = document.querySelector('.header');

        if (!header) {
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

        // Try find already added counter
        const counter = document.getElementById(this.COUNTER_ID);

        if (counter) {
            counter.innerHTML = totalHtml;
        } else {
            const div = document.createElement('div');

            div.innerHTML = totalHtml;
            div.id = this.COUNTER_ID;
            div.style.fontSize = 13 + 'px';
            div.style.marginRight = 10 + 'px';

            const breadcrumbs = header.querySelector('.breadcrumbs');
            header.insertBefore(div, breadcrumbs.nextSibling);
        }
    };

    /**
     * Highlight recognized time tags
     */
    public highlightTimeHashtag = () => {
        const tags = document.querySelectorAll('.contentTag');

        for (const tag of tags) {
            if (getTagSeconds((tag as HTMLElement).innerText) > 0) {
                (tag as HTMLElement).style.outline = `1px dashed ${this.HIGHLIGHT_COLOR}`;
            }
        }
    };
}
