import { getParentLocale } from './get-parent-locale';

describe('getParentLocale', () => {
	it('should return an empty string if there is no hyphen', () => {
		expect(getParentLocale('en')).toBe('');
	});

	it('should return the parent locale if there is a hyphen', () => {
		expect(getParentLocale('en-US')).toBe('en');
	});

	it('should return the parent locale for a more complex locale', () => {
		expect(getParentLocale('zh-Hans-CN')).toBe('zh');
	});

	it('should return the parent locale for a locale with multiple hyphens', () => {
		expect(getParentLocale('en-Latin-US')).toBe('en');
	});

	it('should return an empty string if the input is an empty string', () => {
		expect(getParentLocale('')).toBe('');
	});
});
