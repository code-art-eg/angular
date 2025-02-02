import { isParentLocale } from './is-parent-locale';

describe('isParent', () => {
	it('should return true if both locales are the same', () => {
		expect(isParentLocale('en-US', 'en-US')).toBe(true);
	});

	it('should return false if the parent locale is empty', () => {
		expect(isParentLocale('', 'en-US')).toBe(true);
	});

	it('should return false if the child locale is empty', () => {
		expect(isParentLocale('en-US', '')).toBe(false);
	});

	it('should return true if the first locale is a parent of the second locale', () => {
		expect(isParentLocale('en', 'en-US')).toBe(true);
	});

	it('should return false if the first locale is not a parent of the second locale', () => {
		expect(isParentLocale('en-GB', 'en-US')).toBe(false);
	});

	it('should return false if the first locale is only a partial match', () => {
		expect(isParentLocale('en', 'en-Latin-US')).toBe(true);
	});

	it('should return true if the first locale is a parent of a more complex second locale', () => {
		expect(isParentLocale('zh', 'zh-Hans-CN')).toBe(true);
	});
});
