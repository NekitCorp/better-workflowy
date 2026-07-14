import { expect, test } from './fixtures.js';

test.describe('Hotkey search', () => {
    test.beforeEach(async ({ testPage }) => {
        const storage: IStorage = {
            time: { enabled: false, format: 'd' },
            colors: [],
            search: [
                { shortcut: 'shift+1', value: '#today' },
                { shortcut: 'shift+2', value: '#tomorrow #5m' },
                { shortcut: 'shift+3', value: 'common' },
                { shortcut: 'shift+4', value: '' },
            ],
            swaps: [],
        };

        await testPage.prepare(storage);
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
