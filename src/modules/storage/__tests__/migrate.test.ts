import { describe, expect, it } from 'vitest';
import { migrateHotkey, migrateStorage } from '../migrate';

describe('migrateHotkey', () => {
    it('keeps modern shortcut format', () => {
        expect(migrateHotkey({ shortcut: 'ctrl+shift+a', value: '#today' })).toEqual({
            shortcut: 'ctrl+shift+a',
            value: '#today',
        });
    });

    it('migrates legacy specialKey+key format', () => {
        expect(migrateHotkey({ specialKey: 'shift', key: '1', value: '#today' })).toEqual({
            shortcut: 'shift+1',
            value: '#today',
        });
    });

    it('prefers shortcut when both formats are present', () => {
        expect(
            migrateHotkey({
                shortcut: 'alt+2',
                specialKey: 'shift',
                key: '1',
                value: 'x',
            }),
        ).toEqual({
            shortcut: 'alt+2',
            value: 'x',
        });
    });
});

describe('migrateStorage', () => {
    it('migrates search and swaps entries', () => {
        const result = migrateStorage({
            time: { enabled: true, format: 'd' },
            colors: [],
            search: [{ specialKey: 'shift', key: '1', value: '#today' }] as unknown as IStorage['search'],
            swaps: [
                {
                    specialKey: 'ctrl',
                    key: '1',
                    delete: 'a',
                    insert: 'b',
                },
            ] as unknown as IStorage['swaps'],
        });

        expect(result.search).toEqual([{ shortcut: 'shift+1', value: '#today' }]);
        expect(result.swaps).toEqual([{ shortcut: 'ctrl+1', delete: 'a', insert: 'b' }]);
    });
});
