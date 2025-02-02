/**
 * Check if a value is a promise.
 * @param value
 */
export function isPromise(value: unknown): value is PromiseLike<unknown> {
	return (
		!!value &&
		(typeof value === 'object' || typeof value === 'function') &&
		'then' in value &&
		typeof value.then === 'function'
	);
}
