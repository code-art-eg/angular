/**
 * Checks if two locale strings have the same parent locale.
 *
 * @param {string} locale1 - The first locale string.
 * @param {string} locale2 - The second locale string.
 * @returns {boolean} - Returns true if both locales have the same parent locale, otherwise false.
 */
export function sameParentLocale(locale1: string, locale2: string): boolean {
	if (locale1 === locale2) {
		return true;
	}

	if (locale1 === '' || locale2 === '') {
		return false;
	}
	const hyphen1Index = locale1.indexOf('-');
	const hyphen2Index = locale2.indexOf('-');
	return (
		hyphen1Index > 0 &&
		hyphen2Index > 0 &&
		locale1.slice(0, hyphen1Index) === locale2.slice(0, hyphen2Index)
	);
}
