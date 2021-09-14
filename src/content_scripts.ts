import setHotkey from 'hotkeys-js';
import { readStorage } from './common/storage';
import { paintColorHashtagLine } from './content_scripts/color';
import { startFiltersOnHotkey, startSwaps } from './content_scripts/hotkey';
import { trackHashtagChange } from './content_scripts/observer';
import { highlightTimeHashtag, renderTotalTime } from './content_scripts/time';

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
