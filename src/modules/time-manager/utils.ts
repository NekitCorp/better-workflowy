/**
 * Parse and calculate total seconds from tag string
 * @example "#2h20m" -> 8400
 */
export function getTagSeconds(str: string) {
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

export function formatTime(seconds: number, format: FormatTime): string {
    const days = format === 'd' ? Math.floor(seconds / 86400) : 0;
    if (days > 0) {
        seconds -= days * 86400;
    }

    const hours = ['d', 'h'].includes(format) ? Math.floor(seconds / 3600) : 0;
    if (hours > 0) {
        seconds -= hours * 3600;
    }

    const minutes = ['d', 'h', 'm'].includes(format) ? Math.floor(seconds / 60) : 0;
    if (minutes > 0) {
        seconds -= minutes * 60;
    }

    return (
        (days > 0 ? ` ${days}d` : '') +
        (hours > 0 ? ` ${hours}h` : '') +
        (minutes > 0 ? ` ${minutes}m` : '') +
        (seconds > 0 ? ` ${seconds}s` : '')
    );
}
