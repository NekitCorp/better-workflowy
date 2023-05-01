import path from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from './fixtures.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HTML_PATH = path.join(__dirname, './workflowy.html');

test.describe('Paint hashtag line color', () => {
    test.beforeEach(async ({ page, extensionId }) => {
        await page.goto(`chrome-extension://${extensionId}/src/options/options.html`);
        await page.evaluate(() => {
            const storage: IStorage = {
                time: { enabled: false, format: 'd' },
                colors: [
                    { background: '#ff0000', color: '#000000', hashtag: 'red' },
                    { background: '#005c02', color: '#ffffff', hashtag: 'green' },
                ],
                search: [],
                swaps: [],
            };

            return chrome.storage.local.set(storage);
        });
        await page.goto(`file://${HTML_PATH}`);
    });

    test('Check the color of lines that have the appropriate hashtags', async ({ page }) => {
        const redLocator = page.locator('.innerContentContainer', {
            has: page.locator(`text="Red"`),
        });

        await expect(redLocator).toHaveCSS('color', 'rgb(0, 0, 0)');
        await expect(redLocator).toHaveCSS('background-color', 'rgb(255, 0, 0)');

        const greenLocator = page.locator('.innerContentContainer', {
            has: page.locator(`text="Override to green"`),
        });

        await expect(greenLocator).toHaveCSS('color', 'rgb(255, 255, 255)');
        await expect(greenLocator).toHaveCSS('background-color', 'rgb(0, 92, 2)');
    });

    test.skip('Check color change when adding new hashtag', async ({ page }) => {
        const redLocator = page.locator('.innerContentContainer', {
            has: page.locator(`text="Red"`),
        });

        const lineLocator = page.locator('.content[contenteditable]', {
            has: page.locator(`text="Red"`),
        });
        await lineLocator.focus();
        await page.keyboard.press('End');
        await lineLocator.type(' #green');

        await expect(redLocator).toHaveCSS('color', 'rgb(255, 255, 255)');
        await expect(redLocator).toHaveCSS('background-color', 'rgb(0, 92, 2)');
    });
});
