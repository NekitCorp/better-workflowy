import path from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from './fixtures.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HTML_PATH = path.join(__dirname, './workflowy.html');

test.describe('Filter by hashtags on hotkey', () => {
    test.describe('Option enabled', () => {
        test.beforeEach(async ({ page, extensionId }) => {
            await page.goto(`chrome-extension://${extensionId}/src/options/options.html`);
            await page.evaluate(() => {
                const storage: IStorage = {
                    calcTotalTime: true,
                    colors: [],
                    filters: [
                        { specialKey: 'shift', key: '1', hashtags: 'today' },
                        { specialKey: 'shift', key: '2', hashtags: '5m tomorrow' },
                        { specialKey: 'shift', key: '3', hashtags: '' },
                    ],
                    swaps: [],
                };

                return chrome.storage.local.set(storage);
            });
            await page.goto(`file://${HTML_PATH}`);
        });

        test('Check change url query on hotkey', async ({ page }) => {
            let url = new URL(page.url());
            expect(url.hash).toBe('');

            await page.keyboard.press('Shift+1');

            url = new URL(page.url());
            expect(decodeURIComponent(decodeURIComponent(url.hash))).toBe('#?q=#today ');

            await page.keyboard.press('Shift+2');

            url = new URL(page.url());
            expect(decodeURIComponent(decodeURIComponent(url.hash))).toBe('#?q=#5m #tomorrow ');

            await page.keyboard.press('Shift+3');

            url = new URL(page.url());
            expect(url.hash).toBe('');
        });
    });
});
