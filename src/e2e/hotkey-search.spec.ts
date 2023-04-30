import path from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from './fixtures.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HTML_PATH = path.join(__dirname, './workflowy.html');

test.describe('Hotkey search', () => {
    test.beforeEach(async ({ page, extensionId }) => {
        await page.goto(`chrome-extension://${extensionId}/src/options/options.html`);
        await page.evaluate(() => {
            const storage: IStorage = {
                calcTotalTime: true,
                colors: [],
                search: [
                    { specialKey: 'shift', key: '1', value: '#today' },
                    { specialKey: 'shift', key: '2', value: '#tomorrow #5m' },
                    { specialKey: 'shift', key: '3', value: 'common' },
                    { specialKey: 'shift', key: '4', value: '' },
                ],
                swaps: [],
            };

            return chrome.storage.local.set(storage);
        });
        await page.goto(`file://${HTML_PATH}`);
    });

    test('Check change input value on hotkey', async ({ page }) => {
        await expect(page.locator('#srch-input')).toHaveValue('');

        await page.keyboard.press('Shift+1');

        await expect(page.locator('#srch-input')).toHaveValue('#today');

        await page.keyboard.press('Shift+2');

        await expect(page.locator('#srch-input')).toHaveValue('#tomorrow #5m');

        await page.keyboard.press('Shift+3');

        await expect(page.locator('#srch-input')).toHaveValue('common');

        await page.keyboard.press('Shift+4');

        await expect(page.locator('#srch-input')).toHaveValue('');
    });
});
