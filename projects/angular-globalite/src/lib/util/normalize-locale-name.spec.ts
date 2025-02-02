import { normalizeLocaleName } from './normalize-locale-name';

describe('normalizeLocaleName', () => {
	it('should throw an error for an empty input', () => {
		expect(() => normalizeLocaleName('')).toThrowError(
			'Invalid locale name'
		);
	});

	it('should throw an error for whitespace input', () => {
		expect(() => normalizeLocaleName(' ')).toThrowError(
			'Invalid locale name'
		);
	});

	it('should throw an error for null input', () => {
		expect(() =>
			normalizeLocaleName(null as unknown as string)
		).toThrowError('Invalid locale name');
	});

	it('should throw an error for undefined input', () => {
		expect(() =>
			normalizeLocaleName(undefined as unknown as string)
		).toThrowError('Invalid locale name');
	});

	it('should throw an error for input with invalid characters', () => {
		expect(() => normalizeLocaleName('en@US')).toThrowError(
			'Invalid locale name'
		);
	});

	it('should throw an error for input with too many parts', () => {
		expect(() => normalizeLocaleName('en-US-Extra-Part')).toThrowError(
			'Invalid locale name'
		);
	});

	it('should trim whitespace from the input', () => {
		expect(normalizeLocaleName('  en-US  ')).toBe('en-US');
	});

	it('should replace underscores with hyphens', () => {
		expect(normalizeLocaleName('en_US')).toBe('en-US');
	});

	it('should convert the first part to lowercase', () => {
		expect(normalizeLocaleName('EN-us')).toBe('en-US');
	});

	it('should convert the second part to title case if it is longer than 2 characters', () => {
		expect(normalizeLocaleName('en-Us')).toBe('en-US');
	});

	it('should convert the second part to uppercase if it is 2 characters or less', () => {
		expect(normalizeLocaleName('en-us')).toBe('en-US');
	});

	it('should handle multiple parts correctly', () => {
		expect(normalizeLocaleName('zh-hans-cn')).toBe('zh-Hans-CN');
	});

	it('should throw when script is specified but not region', () => {
		expect(() => normalizeLocaleName('en-Extra')).toThrowError(
			'Invalid locale name'
		);
	});
});
