import { test as base, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isMacOS = process.platform === 'darwin';
const controlKey = isMacOS ? 'Meta' : 'Control';

const TEST_DATA = `
Better WorkFlowy

- Quick filters: #today #tomorrow #important
- Calculate total hashtag time
    - Common #2h30m #today
    - Common #1d2h12m14s #important
    - Common #2h20m1d #today
    - Separated #5m #20m #2h #tomorrow
    - Separated #5m #5m #5m #tomorrow
    - Wrong 2h #test2h #2ha #2m2
- Swap hashtags on hotkey
    - Job 1 #test2 #dd
    - Job 2 #dd #test2
    - Job 3 #month #test2 #dd #5h
    - Job 4 #test2 #dd
    - Job 5 #sometag #sometag2 #test1 #test2
    - Job 6 #today #test1 #test2
    - Job 7 #sometag #sometag2 #test1 #test2
    - Job 8 #test1 #test2
- Paint hashtag line color
    - Red #red
    - Override to green #red #green
`;

export const test = base.extend<{
    context: BrowserContext;
    extensionId: string;
    testPage: { prepare: (storage: IStorage) => Promise<void>; isMacOS: boolean };
}>({
    // https://playwright.dev/docs/chrome-extensions
    context: async ({}, use) => {
        const pathToExtension = path.join(__dirname, '../../dist');
        const context = await chromium.launchPersistentContext('', {
            headless: false,
            args: [
                `--headless=new`, // the new headless arg for chrome v109+. Use '--headless=chrome' as arg for browsers v94-108.
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`,
            ],
        });
        await use(context);
        await context.close();
    },
    extensionId: async ({ context }, use) => {
        // for manifest v3:
        let [background] = context.serviceWorkers();
        if (!background) background = await context.waitForEvent('serviceworker');

        const extensionId = background.url().split('/')[2];
        await use(extensionId);
    },
    // https://playwright.dev/docs/test-fixtures
    testPage: async ({ page, extensionId }, use) => {
        async function prepare(storage: IStorage): Promise<void> {
            await page.goto(`chrome-extension://${extensionId}/src/options/options.html`);
            await page.evaluate((data: IStorage) => chrome.storage.local.set(data), storage);
            await page.goto('https://workflowy.com/online-notepad-test/');
            await page.locator('.addChildButton').click();
            await page.evaluate((text) => navigator.clipboard.writeText(text), TEST_DATA);
            await page.locator('.content[contenteditable]').last().press(`${controlKey}+V`);
        }

        await use({ prepare, isMacOS });
    },
});

export const expect = test.expect;
