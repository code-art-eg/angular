const localeNameRegex =
	/^\s*([A-Za-z]{2})(?:(?:[-_]([A-Za-z]{2,6}))?[-_]([a-zA-Z]{2}))?\s*$/;

/**
 * Normalizes a locale name by trimming, replacing underscores with hyphens,
 * and formatting each part of the locale string appropriately.
 *
 * @param {string} locale - The locale string to normalize.
 * @returns {string} - The normalized locale string.
 */
export function normalizeLocaleName(locale: string): string {
	if (!locale) {
		throw new Error('Invalid locale name');
	}
	if (locale.length === 0) {
		throw new Error('Invalid locale name');
	}

	const match = localeNameRegex.exec(locale);
	if (!match) {
		throw new Error('Invalid locale name');
	}

	const language = match[1].toLowerCase();
	const script = match[2]
		? match[2][0].toUpperCase() + match[2].slice(1).toLowerCase()
		: null;
	const region = match[3] ? match[3].toUpperCase() : '';

	if (!script && !region) {
		return language;
	}

	if (!script) {
		return `${language}-${region}`;
	}

	if (!region) {
		throw new Error('Invalid locale name: ' + locale);
	}

	return `${language}-${script}-${region}`;
}
