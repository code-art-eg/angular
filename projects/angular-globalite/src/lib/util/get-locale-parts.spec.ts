import { getLocaleParts } from './get-locale-parts';

describe('getLocaleParts', () => {
	it('should return the correct locale parts for a valid locale', () => {
		const locale = 'en-US';
		const result = getLocaleParts(locale);
		expect(result).toEqual({
			language: 'en',
			region: 'US',
			script: null,
		});
	});

	it('should return the correct locale parts for a locale without region', () => {
		const locale = 'en';
		const result = getLocaleParts(locale);
		expect(result).toEqual({
			language: 'en',
			region: null,
			script: null,
		});
	});

	it('should return undefined for both language and region for an invalid locale', () => {
		const locale = 'invalid-locale';
		expect(() => getLocaleParts(locale)).toThrow();
	});

	it('should handle locales with script subtags', () => {
		const locale = 'Ar-arabic-eg';
		const result = getLocaleParts(locale);
		expect(result).toEqual({
			language: 'ar',
			region: 'EG',
			script: 'Arabic',
		});
	});
});
