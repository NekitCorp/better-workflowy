import path from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from './fixtures.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HTML_PATH = path.join(__dirname, './workflowy.html');

const TIME_HASHTAGS = ['#2h30m', '#1d2h12m14s', '#2h20m1d', '#5m', '#20m', '#2h'];
const NOT_TIME_HASHTAGS = ['#today', '#important', '#tomorrow', '#test2h', '#2ha', '#2m2'];

test.describe('Calculate total hashtag time', () => {
    test.describe('Option enabled', () => {
        test.beforeEach(async ({ page, extensionId }) => {
            await page.goto(`chrome-extension://${extensionId}/src/options/options.html`);
            await page.evaluate(() => {
                const storage: IStorage = {
                    calcTotalTime: true,
                    colors: [],
                    search: [],
                    swaps: [],
                };

                return chrome.storage.local.set(storage);
            });
            await page.goto(`file://${HTML_PATH}`);
        });

        test('Check HTML', async ({ page }) => {
            await expect(page.locator('#bw-time-counter')).toHaveText('2d 14h 42m 14s');

            for (const tag of TIME_HASHTAGS) {
                for (const element of await page.locator(`[data-val="${tag}"]`).all()) {
                    const outline = await element.evaluate((el) => getComputedStyle(el).outline);

                    expect(outline).toBe('rgb(19, 203, 211) dashed 1px');
                }
            }

            for (const tag of NOT_TIME_HASHTAGS) {
                for (const element of await page.locator(`[data-val="${tag}"]`).all()) {
                    const outline = await element.evaluate((el) => getComputedStyle(el).outline);

                    expect(outline).toBe('rgb(0, 0, 0) none 0px');
                }
            }
        });
    });

    test.describe('Option disabled', () => {
        test.beforeEach(async ({ page, extensionId }) => {
            await page.goto(`chrome-extension://${extensionId}/src/options/options.html`);
            await page.evaluate(() => {
                const storage: IStorage = {
                    calcTotalTime: false,
                    colors: [],
                    search: [],
                    swaps: [],
                };

                return chrome.storage.local.set(storage);
            });
            await page.goto(`file://${HTML_PATH}`);
        });

        test('Check HTML', async ({ page }) => {
            await expect(page.locator('#bw-time-counter')).toHaveCount(0);

            for (const tag of TIME_HASHTAGS) {
                for (const element of await page.locator(`[data-val="${tag}"]`).all()) {
                    const outline = await element.evaluate((el) => getComputedStyle(el).outline);

                    expect(outline).toBe('rgb(0, 0, 0) none 0px');
                }
            }

            for (const tag of NOT_TIME_HASHTAGS) {
                for (const element of await page.locator(`[data-val="${tag}"]`).all()) {
                    const outline = await element.evaluate((el) => getComputedStyle(el).outline);

                    expect(outline).toBe('rgb(0, 0, 0) none 0px');
                }
            }
        });
    });
});
