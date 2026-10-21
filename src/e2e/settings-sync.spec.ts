import { expect, test, TEST_STORAGE } from './fixtures.js';

const SYNCED_STORAGE: IStorage = {
    time: { enabled: false, format: 'h' },
    colors: [],
    search: [{ shortcut: 'shift+9', value: '#synced' }],
    swaps: [],
};

test.describe('Settings sync', () => {
    test.beforeEach(async ({ page, extensionId }) => {
        await page.goto(`chrome-extension://${extensionId}/src/options/options.html`);
        await page.evaluate((data: IStorage) => chrome.storage.local.set(data), TEST_STORAGE);
        await page.reload();
    });

    test('Uploads local settings when the account has none', async ({ page }) => {
        await page.getByLabel('Sync settings').click();
        await expect(page.getByLabel('Sync settings')).toBeChecked();

        const synced = await page.evaluate(() => chrome.storage.sync.get(['colors', 'syncMeta']));
        expect(synced.colors).toEqual(TEST_STORAGE.colors);
        expect(synced.syncMeta.updatedAt).toEqual(expect.any(Number));
    });

    test('Asks before replacing settings found in the account', async ({ page }) => {
        await page.evaluate(
            (data: IStorage) => chrome.storage.sync.set({ ...data, syncMeta: { updatedAt: 1 } }),
            SYNCED_STORAGE,
        );

        await page.getByLabel('Sync settings').click();
        await expect(page.getByLabel('Sync settings')).not.toBeChecked();
        await page.getByRole('button', { name: 'Use synced settings' }).click();

        await expect(page.getByLabel('Sync settings')).toBeChecked();
        await expect(page.locator('input[type="text"]').first()).toHaveValue('#synced');
    });

    test('Keeps synced settings locally after turning sync off', async ({ page }) => {
        await page.getByLabel('Sync settings').click();
        await expect(page.getByLabel('Sync settings')).toBeChecked();
        await page.getByLabel('Sync settings').click();
        await expect(page.getByLabel('Sync settings')).not.toBeChecked();

        const local = await page.evaluate(() =>
            chrome.storage.local.get(['colors', 'syncEnabled']),
        );
        expect(local.syncEnabled).toBe(false);
        expect(local.colors).toEqual(TEST_STORAGE.colors);
    });
});
