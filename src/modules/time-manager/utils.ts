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
