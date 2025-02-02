const rx = /^\s*$/;

/**
 * Returns true if the given string is either empty or contains only whitespace.
 *
 * @param str The string to check.
 * @returns true if the given string is either empty or contains only whitespace.
 */
export function isWhitespaceOrEmpty(str: string): boolean {
	return str.length === 0 || rx.test(str);
}
