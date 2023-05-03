import { expect, test } from './fixtures.js';

test.describe('Paint hashtag line color', () => {
    test.beforeEach(async ({ testPage }) => {
        const storage: IStorage = {
            time: { enabled: false, format: 'd' },
            colors: [
                { background: '#ff0000', color: '#000000', hashtag: 'red' },
                { background: '#005c02', color: '#ffffff', hashtag: 'green' },
            ],
            search: [],
            swaps: [],
        };

        await testPage.prepare(storage);
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

    test('Check color change when adding new hashtag', async ({ page, testPage }) => {
        const redLocator = page.locator('.innerContentContainer', {
            has: page.locator(`text="Red"`),
        });

        const lineLocator = page.locator('.content[contenteditable]', {
            has: page.locator(`text="Red"`),
        });
        await lineLocator.focus();
        await page.keyboard.press(testPage.isMacOS ? 'Meta+ArrowRight' : 'End');
        await lineLocator.type(' #green');

        await expect(redLocator).toHaveCSS('color', 'rgb(255, 255, 255)');
        await expect(redLocator).toHaveCSS('background-color', 'rgb(0, 92, 2)');
    });
});
