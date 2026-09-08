import { getAge } from './get-age';
import type { DateOnly } from '@code-art-eg/globalite';

describe('getAge Utility Function', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should return the correct age if the input is a valid Date object', () => {
		const birthDate = new Date(2000, 0, 1); // January 1, 2000
		const currentDate = new Date(2023, 0, 1); // January 1, 2023
		vi.setSystemTime(currentDate);
		expect(getAge(birthDate)).toBe(23);
	});

	it('should return the correct age if the input is a valid DateOnly object', () => {
		const birthDateOnly: DateOnly = { year: 2000, month: 1, day: 1 };
		const currentDate = new Date(2023, 0, 1); // January 1, 2023
		vi.setSystemTime(currentDate);
		expect(getAge(birthDateOnly)).toBe(23);
	});

	it('should return the correct when month is not reached', () => {
		const birthDateOnly: DateOnly = { year: 2000, month: 2, day: 1 };
		const currentDate = new Date(2023, 0, 1); // January 1, 2023
		vi.setSystemTime(currentDate);
		expect(getAge(birthDateOnly)).toBe(22);
	});

	it('should return the correct when date is not reached', () => {
		const birthDateOnly: DateOnly = { year: 2000, month: 1, day: 2 };
		const currentDate = new Date(2023, 0, 1); // January 1, 2023
		vi.setSystemTime(currentDate);
		expect(getAge(birthDateOnly)).toBe(22);
	});
});
