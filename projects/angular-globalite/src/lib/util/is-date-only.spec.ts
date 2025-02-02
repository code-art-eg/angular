import { isDateOnly } from './is-date-only';

describe('isDateOnly', () => {
	it('should return true for a valid DateOnly', () => {
		expect(
			isDateOnly({
				year: 2023,
				month: 10,
				day: 15,
			})
		).toBe(true);
	});

	it('should return false for a invalid DateOnly ', () => {
		expect(
			isDateOnly({
				year: -1,
				month: 10,
				day: 15,
			})
		).toBe(false);
	});

	it('should return false for a invalid DateOnly in non leap year', () => {
		expect(
			isDateOnly({
				year: 1900,
				month: 2,
				day: 29,
			})
		).toBe(false);
	});

	it('should return false for an invalid DateOnly string', () => {
		expect(isDateOnly('2023-12-10')).toBe(false);
	});

	it('should return false for a string with time component', () => {
		expect(isDateOnly('2023-10-15T10:00:00')).toBe(false);
	});

	it('should return false for a non-date string', () => {
		expect(isDateOnly('not-a-date')).toBe(false);
	});

	it('should return false for an empty string', () => {
		expect(isDateOnly('')).toBe(false);
	});

	it('should return false for a null value', () => {
		expect(isDateOnly(null)).toBe(false);
	});

	it('should return false for an undefined value', () => {
		expect(isDateOnly(undefined)).toBe(false);
	});
});
