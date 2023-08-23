import { triggerInputEvent } from '../modules/hotkey-search/background';
import { Logger } from '../modules/logger';

const logger = new Logger();

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type == 'fire_search_input_event') {
        // Execute script in the current tab
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            func: triggerInputEvent,
            args: [msg.value, logger],
            // https://www.reddit.com/r/learnjavascript/comments/129olyq/why_objectgetownpropertydescriptors_returns_empty/
            world: 'MAIN',
        });
    }
});

logger.log('Background script initialized.');
