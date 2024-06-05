import { expect, test } from './fixtures.js';

const TIME_HASHTAGS = ['#2h30m', '#1d2h12m14s', '#2h20m1d', '#5m', '#20m', '#2h'];
const NOT_TIME_HASHTAGS = ['#today', '#important', '#tomorrow', '#test2h', '#2ha', '#2m2'];

test.describe('Calculate total hashtag time', () => {
    test.describe('Option enabled', () => {
        test.beforeEach(async ({ testPage }) => {
            const storage: IStorage = {
                time: { enabled: true, format: 'd' },
                colors: [],
                search: [],
                swaps: [],
            };

            await testPage.prepare(storage);
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
                    const outlineWidth = await element.evaluate(
                        (el) => getComputedStyle(el).outlineWidth,
                    );

                    expect(outlineWidth).toBe('0px');
                }
            }
        });

        // The total time must be recalculated when expanding and collapsing the item containing time.
        test('Consider expanding and collapsing an item', async ({ page, testPage }) => {
            const toggle = page
                .locator('.name', { hasText: 'Swap hashtags on hotkey' })
                .locator('a[data-handbook="expand.toggle"]');

            // Collapse
            await toggle.click();

            // Waiting for requestIdleInterval
            await page.waitForTimeout(1000);

            // Minus 5 hours
            await expect(page.locator('#bw-time-counter')).toHaveText('2d 9h 42m 14s');

            // Expand
            await toggle.click();

            // Waiting for requestIdleInterval
            await page.waitForTimeout(1000);

            // Total time should return
            await expect(page.locator('#bw-time-counter')).toHaveText('2d 14h 42m 14s');
        });
    });

    test.describe('Option disabled', () => {
        test.beforeEach(async ({ testPage }) => {
            const storage: IStorage = {
                time: { enabled: false, format: 'd' },
                colors: [],
                search: [],
                swaps: [],
            };

            await testPage.prepare(storage);
        });

        test('Check HTML', async ({ page }) => {
            await expect(page.locator('#bw-time-counter')).toHaveCount(0);

            for (const tag of TIME_HASHTAGS) {
                for (const element of await page.locator(`[data-val="${tag}"]`).all()) {
                    const outlineWidth = await element.evaluate(
                        (el) => getComputedStyle(el).outlineWidth,
                    );

                    expect(outlineWidth).toBe('0px');
                }
            }

            for (const tag of NOT_TIME_HASHTAGS) {
                for (const element of await page.locator(`[data-val="${tag}"]`).all()) {
                    const outlineWidth = await element.evaluate(
                        (el) => getComputedStyle(el).outlineWidth,
                    );

                    expect(outlineWidth).toBe('0px');
                }
            }
        });
    });
});
