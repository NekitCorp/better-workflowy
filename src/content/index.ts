import { domManager } from '../modules/dom-manager';
import { HashtagColor } from '../modules/hashtag-color';
import { HashtagFilter } from '../modules/hashtag-filter';
import { HashtagSwap } from '../modules/hashtag-swap';
import { hotkeysManager } from '../modules/hotkeys';
import { storage } from '../modules/storage';
import { TimeManager } from '../modules/time-manager';

storage.readStorage((data) => {
    const timeManager = new TimeManager(data.calcTotalTime);
    timeManager.init();

    const hashtagColor = new HashtagColor(data.colors);

    domManager.trackHashtagChange(
        data.calcTotalTime
            ? [
                  timeManager.highlightTimeHashtag,
                  timeManager.renderTotalTime,
                  hashtagColor.paintColorHashtagLine,
              ]
            : [hashtagColor.paintColorHashtagLine],
    );

    new HashtagFilter(data.filters, hotkeysManager).init();
    new HashtagSwap(data.swaps, hotkeysManager, domManager).init();
});
