import { getLocaleParts } from './get-locale-parts';

/**
 * Gets the parent locale of the given locale string.
 * The implementation assumes that the locale is normalized.
 * @param {string} locale - The locale string.
 * @returns {string} - The parent locale string.
 */
export function getParentLocale(locale: string): string {
	const parts = getLocaleParts(locale);

	if (!parts.region) {
		return '';
	}

	return parts.language;
}
