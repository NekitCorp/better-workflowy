export class HotkeySearch {
    constructor(private search: IStorage['search'], private hotkeysManager: IHotkeysManager) {}

    async init() {
        for (const item of this.search) {
            this.hotkeysManager.setHotKey(`${item.specialKey}+${item.key}`, () => {
                // If you are injecting the code as a content script the code is being executed in an "isolated world".
                // So, for fire input event, we need alternatively use `chrome.scripting.executeScript()`
                // with world option set to 'MAIN' from background scripts.
                chrome.runtime.sendMessage({
                    type: 'fire_search_input_event',
                    value: item.value,
                });
            });
        }
    }
}
