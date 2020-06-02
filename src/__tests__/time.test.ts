import { getTagSeconds } from "../utils/time";

describe("time tests", () => {
    test("getTagSeconds test", () => {
        expect(getTagSeconds("#2h")).toBe(2 * 60 * 60);
        expect(getTagSeconds("#2h2h")).toBe(2 * 60 * 60);
        expect(getTagSeconds("#2h20m")).toBe(2 * 60 * 60 + 20 * 60);
        expect(getTagSeconds("#2h20m1d")).toBe(2 * 60 * 60 + 20 * 60 + 60 * 60 * 24);

        expect(getTagSeconds("2h")).toBe(0);
        expect(getTagSeconds("#test2h")).toBe(0);
        expect(getTagSeconds("#2ha")).toBe(0);
        expect(getTagSeconds("#2m2")).toBe(0);
    });
});
