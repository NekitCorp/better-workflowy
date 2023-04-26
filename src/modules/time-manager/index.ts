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
        let totalSeconds = tags.reduce((acc, val) => acc + this.getTagSeconds(val), 0);

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
            if (this.getTagSeconds((tag as HTMLElement).innerText) > 0) {
                (tag as HTMLElement).style.outline = `1px dashed ${this.HIGHLIGHT_COLOR}`;
            }
        }
    };

    /**
     * Parse and calculate total seconds from tag string
     * @example "#2h20m" -> 8400
     */
    private getTagSeconds(str: string) {
        // Test to fit string
        const regExp = /^#(\d+(d|h|m|s))+$/;
        if (!regExp.test(str)) {
            return 0;
        }

        let totalSeconds = 0;

        const days = str.match(/(\d+)\s*d/);
        const hours = str.match(/(\d+)\s*h/);
        const minutes = str.match(/(\d+)\s*m/);
        const seconds = str.match(/(\d+)\s*s/);

        if (days) {
            totalSeconds += parseInt(days[1]) * 86400;
        }

        if (hours) {
            totalSeconds += parseInt(hours[1]) * 3600;
        }

        if (minutes) {
            totalSeconds += parseInt(minutes[1]) * 60;
        }

        if (seconds) {
            totalSeconds += parseInt(seconds[1]);
        }

        return totalSeconds;
    }
}
