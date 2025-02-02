/**
 * Gets the parent locale of the given locale string.
 * The implementation assumes that the locale is normalized.
 * @param {string} locale - The locale string.
 * @returns {string} - The parent locale string.
 */
export function getParentLocale(locale: string): string {
	const split = locale.split('-');
	if (split.length === 1) {
		return '';
	}

	return split[0].toLowerCase();
}
