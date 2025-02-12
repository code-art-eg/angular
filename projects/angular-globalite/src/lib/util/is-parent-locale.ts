import { getLocaleParts } from './get-locale-parts';

/**
 * Checks if the first locale is a parent of the second locale.
 * The implementation assumes that the locales are normalized.
 *
 * @param {string} locale1 - The parent locale string.
 * @param {string} locale2 - The child locale string.
 * @returns {boolean} - Returns true if locale1 is a parent of locale2, otherwise false.
 */
export function isParentLocale(locale1: string, locale2: string): boolean {
	const parentParts = getLocaleParts(locale1);
	const childParts = getLocaleParts(locale2);

	if (parentParts.region || !childParts.region) {
		return false;
	}

	return parentParts.language === childParts.language;
}
