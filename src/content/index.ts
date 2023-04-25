import setHotkey from 'hotkeys-js';
import { readStorage } from '../common/storage';
import { paintColorHashtagLine } from './color';
import { startFiltersOnHotkey, startSwaps } from './hotkey';
import { trackHashtagChange } from './observer';
import { highlightTimeHashtag, renderTotalTime } from './time';

// By default hotkeys are not enabled for INPUT, SELECT, TEXTAREA elements.
setHotkey.filter = function (event) {
    return true;
};

readStorage(({ filters, calcTotalTime, swaps, colors }) => {
    if (calcTotalTime) {
        highlightTimeHashtag();
        renderTotalTime();
    }

    trackHashtagChange(
        calcTotalTime
            ? [highlightTimeHashtag, renderTotalTime, (container) => paintColorHashtagLine(container, colors)]
            : [(container) => paintColorHashtagLine(container, colors)],
    );

    startFiltersOnHotkey(filters);
    startSwaps(swaps);
});
