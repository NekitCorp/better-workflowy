import { expect, test } from './fixtures.js';

test.describe('Swap hashtags on hotkey', () => {
    test.beforeEach(async ({ testPage }) => {
        const storage: IStorage = {
            time: { enabled: false, format: 'd' },
            colors: [],
            search: [],
            swaps: [
                {
                    specialKey: 'ctrl',
                    key: '1',
                    delete: 'test1 test2',
                    insert: 'insert1 insert2',
                },
            ],
        };

        await testPage.prepare(storage);
    });

    test('Check swap hashtags on hotkey', async ({ page }) => {
        const rows = [
            {
                selector: 'Job 1',
                initial: 'Job 1 #test2 #dd',
                expected: 'Job 1 #dd #insert1 #insert2',
            },
            {
                selector: 'Job 2',
                initial: 'Job 2 #dd #test2',
                expected: 'Job 2 #dd #insert1 #insert2',
            },
            {
                selector: 'Job 3',
                initial: 'Job 3 #month #test2 #dd #5h',
                expected: 'Job 3 #month #dd #5h #insert1 #insert2',
            },
            {
                selector: 'Job 4',
                initial: 'Job 4 #test2 #dd',
                expected: 'Job 4 #dd #insert1 #insert2',
            },
            {
                selector: 'Job 5',
                initial: 'Job 5 #sometag #sometag2 #test1 #test2',
                expected: 'Job 5 #sometag #sometag2 #insert1 #insert2',
            },
            {
                selector: 'Job 6',
                initial: 'Job 6 #today #test1 #test2',
                expected: 'Job 6 #today #insert1 #insert2',
            },
            {
                selector: 'Job 7',
                initial: 'Job 7 #sometag #sometag2 #test1 #test2',
                expected: 'Job 7 #sometag #sometag2 #insert1 #insert2',
            },
            {
                selector: 'Job 8',
                initial: 'Job 8 #test1 #test2',
                expected: 'Job 8 #insert1 #insert2',
            },
        ];

        for (const row of rows) {
            await expect(page.getByText(row.selector)).toHaveText(row.initial, {
                useInnerText: true,
            });

            await page
                .locator('.content[contenteditable]', {
                    has: page.locator(`text="${row.selector}"`),
                })
                .focus();
            await page.keyboard.press('Control+1');

            await expect(page.getByText(row.selector)).toHaveText(row.expected, {
                useInnerText: true,
            });
        }
    });
});
