import { storage } from '../modules/storage';

chrome.runtime.onInstalled.addListener(() => {
    storage.readStorage(console.log);
});
