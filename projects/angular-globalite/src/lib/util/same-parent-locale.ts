import { getLocaleParts } from './get-locale-parts';

/**
 * Checks if two locale strings have the same parent locale.
 *
 * @param {string} locale1 - The first locale string.
 * @param {string} locale2 - The second locale string.
 * @returns {boolean} - Returns true if both locales have the same parent locale, otherwise false.
 */
export function sameParentLocale(locale1: string, locale2: string): boolean {
	const parent1 = getLocaleParts(locale1);
	const parent2 = getLocaleParts(locale2);
	return parent1.language === parent2.language;
}
