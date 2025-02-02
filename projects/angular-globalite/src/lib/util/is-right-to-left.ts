import { normalizeLocaleName } from './normalize-locale-name';

const rtlLanguages = [
	'ar', // Arabic
	'dv', // Dhivehi
	'fa', // Persian
	'he', // Hebrew
	'ku', // Kurdish
	'ps', // Pashto
	'sd', // Sindhi
	'ug', // Uyghur
	'ur', // Urdu
	'yi', // Yiddish
];

/**
 * Checks if the locale is right-to-left.
 * The implementation assumes that the locale is normalized.
 *
 * @param {string} locale - The locale string.
 * @returns {boolean} - Returns true if the locale is right-to-left, otherwise false.
 */
export function isRightToLeft(locale: string): boolean {
	locale = normalizeLocaleName(locale);
	const parts = locale.split('-');
	if (parts.length === 3 && parts[1] === 'Arab') {
		return true;
	}
	const language = parts[0];
	return rtlLanguages.includes(language);
}
