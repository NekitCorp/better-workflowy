import { DomManager } from '../modules/dom-manager';
import { HashtagColor } from '../modules/hashtag-color';
import { HashtagSwap } from '../modules/hashtag-swap';
import { HotkeySearch } from '../modules/hotkey-search';
import { HotkeysManager } from '../modules/hotkeys';
import { Logger } from '../modules/logger';
import { storage } from '../modules/storage';
import { TimeManager } from '../modules/time-manager';

const logger = new Logger();
const domManager = new DomManager(logger);
const hotkeysManager = new HotkeysManager(logger);

logger.log('Waiting for app loading...');

domManager.loadingApp().then(() => {
    logger.log('App loaded! Modules initializing...');

    storage.readStorage((data) => {
        logger.log('Options: ' + JSON.stringify(data));

        if (data.time.enabled) {
            new TimeManager(data.time.format, domManager, logger).init();
            logger.log('TimeManager module initialized.');
        }

        if (data.colors.length > 0) {
            new HashtagColor(data.colors, domManager).init();
            logger.log('HashtagColor module initialized.');
        }

        if (data.search.length > 0) {
            new HotkeySearch(data.search, hotkeysManager).init();
            logger.log('HotkeySearch module initialized.');
        }

        if (data.swaps.length > 0) {
            new HashtagSwap(data.swaps, hotkeysManager, domManager).init();
            logger.log('HashtagSwap module initialized.');
        }
    });
});
