import { getLocaleParts } from './get-locale-parts';

/**
 * Normalizes a locale name by trimming, replacing underscores with hyphens,
 * and formatting each part of the locale string appropriately.
 *
 * @param {string} locale - The locale string to normalize.
 * @returns {string} - The normalized locale string.
 */
export function normalizeLocaleName(locale: string): string {
	const { language, script, region } = getLocaleParts(locale);
	if (!script && !region) {
		return language;
	}
	if (!script) {
		return `${language}-${region}`;
	}

	return `${language}-${script}-${region}`;
}
