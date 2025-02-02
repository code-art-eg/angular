import { getParentLocale } from './get-parent-locale';

/**
 * Checks if the first locale is a parent of the second locale.
 * The implementation assumes that the locales are normalized.
 *
 * @param {string} locale1 - The parent locale string.
 * @param {string} locale2 - The child locale string.
 * @returns {boolean} - Returns true if locale1 is a parent of locale2, otherwise false.
 */
export function isParentLocale(locale1: string, locale2: string): boolean {
	if (locale1 === locale2) {
		return true;
	}
	locale2 = getParentLocale(locale2);
	if (locale2 === locale1) {
		return true;
	}

	return getParentLocale(locale2) === locale1;
}
