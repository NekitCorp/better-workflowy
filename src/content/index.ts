import { DomManager } from '../modules/dom-manager';
import { HashtagColor } from '../modules/hashtag-color';
import { HashtagFilter } from '../modules/hashtag-filter';
import { HashtagSwap } from '../modules/hashtag-swap';
import { HotkeysManager } from '../modules/hotkeys';
import { storage } from '../modules/storage';
import { TimeManager } from '../modules/time-manager';

const domManager = new DomManager();
const hotkeysManager = new HotkeysManager();

domManager.loadingApp().then(() => {
    storage.readStorage((data) => {
        console.log('[Better WorkFlowy] App loaded.');
        console.log(`[Better WorkFlowy] Options:`, JSON.stringify(data, null, 2));

        new TimeManager(data.calcTotalTime, domManager).init();
        new HashtagColor(data.colors, domManager).init();
        new HashtagFilter(data.filters, hotkeysManager).init();
        new HashtagSwap(data.swaps, hotkeysManager, domManager).init();
    });
});
