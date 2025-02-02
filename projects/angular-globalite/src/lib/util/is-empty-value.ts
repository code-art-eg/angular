import { isWhitespaceOrEmpty } from './is-whitespace-or-empty';

/**
 * Returns `true` if the value is `null`, `undefined`, an empty string, an empty array, or an empty object.
 */
export function isEmptyValue(value: unknown) {
	return (
		value === null ||
		value === undefined ||
		(typeof value === 'string' && isWhitespaceOrEmpty(value)) ||
		(Array.isArray(value) && value.length === 0) ||
		(typeof value === 'object' &&
			value.constructor === Object &&
			Object.keys(value).length === 0)
	);
}
