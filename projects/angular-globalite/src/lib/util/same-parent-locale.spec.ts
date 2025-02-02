import { sameParentLocale } from './same-parent-locale';

describe('sameParentLocale', () => {
	it('should return true if both locales are the same', () => {
		expect(sameParentLocale('en-US', 'en-US')).toBe(true);
	});

	it('should return false if the first locale is empty', () => {
		expect(sameParentLocale('', 'en-US')).toBe(false);
	});

	it('should return false if the second locale is empty', () => {
		expect(sameParentLocale('en-US', '')).toBe(false);
	});

	it('should return true if both locales have the same parent locale', () => {
		expect(sameParentLocale('en-US', 'en-GB')).toBe(true);
	});

	it('should return false if the locales do not have the same parent locale', () => {
		expect(sameParentLocale('en-US', 'fr-FR')).toBe(false);
	});

	it('should return false if one locale is only a partial match', () => {
		expect(sameParentLocale('en', 'en-Latin-US')).toBe(false);
	});

	it('should return true if both locales have the same parent locale in a more complex case', () => {
		expect(sameParentLocale('zh-Hans-CN', 'zh-Hant-TW')).toBe(true);
	});
});
