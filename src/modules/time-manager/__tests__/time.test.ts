import { describe, expect, it } from 'vitest';
import { getTagSeconds, formatTime } from '../utils';

describe('time tests', () => {
    it('getTagSeconds test', () => {
        expect(getTagSeconds('#2h')).toBe(2 * 60 * 60);
        expect(getTagSeconds('#2h2h')).toBe(2 * 60 * 60);
        expect(getTagSeconds('#2h20m')).toBe(2 * 60 * 60 + 20 * 60);
        expect(getTagSeconds('#2h20m1d')).toBe(2 * 60 * 60 + 20 * 60 + 60 * 60 * 24);

        expect(getTagSeconds('2h')).toBe(0);
        expect(getTagSeconds('#test2h')).toBe(0);
        expect(getTagSeconds('#2ha')).toBe(0);
        expect(getTagSeconds('#2m2')).toBe(0);
    });

    it('formatTime test', () => {
        expect(formatTime(225734, 'd')).toBe(' 2d 14h 42m 14s');
        expect(formatTime(225734, 'h')).toBe(' 62h 42m 14s');
        expect(formatTime(225734, 'm')).toBe(' 3762m 14s');
        expect(formatTime(225734, 's')).toBe(' 225734s');

        expect(formatTime(0, 'd')).toBe('');
        expect(formatTime(60, 'd')).toBe(' 1m');
        expect(formatTime(60 * 60, 'd')).toBe(' 1h');
        expect(formatTime(60 * 60 * 24, 'd')).toBe(' 1d');

        expect(formatTime(60 * 60 * 24 * 3, 'd')).toBe(' 3d');
        expect(formatTime(60 * 60 * 24 * 3, 'h')).toBe(' 72h');
        expect(formatTime(60 * 60 * 24 * 3 + 2, 'h')).toBe(' 72h 2s');
    });
});
