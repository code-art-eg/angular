import { isEmptyValue } from './is-empty-value';

describe('isEmptyValue', () => {
	it('should return true for null', () => {
		expect(isEmptyValue(null)).toBe(true);
	});

	it('should return true for undefined', () => {
		expect(isEmptyValue(undefined)).toBe(true);
	});

	it('should return true for empty string', () => {
		expect(isEmptyValue('')).toBe(true);
	});

	it('should return true for empty array', () => {
		expect(isEmptyValue([])).toBe(true);
	});

	it('should return true for empty object', () => {
		expect(isEmptyValue({})).toBe(true);
	});

	it('should return false for non-empty string', () => {
		expect(isEmptyValue('hello')).toBe(false);
	});

	it('should return false for non-empty array', () => {
		expect(isEmptyValue([1, 2, 3])).toBe(false);
	});

	it('should return false for non-empty object', () => {
		expect(isEmptyValue({ key: 'value' })).toBe(false);
	});

	it('should return false for number', () => {
		expect(isEmptyValue(123)).toBe(false);
	});

	it('should return false for boolean', () => {
		expect(isEmptyValue(true)).toBe(false);
		expect(isEmptyValue(false)).toBe(false);
	});

	it('should return false for Date', () => {
		expect(isEmptyValue(new Date())).toBe(false);
	});
});
