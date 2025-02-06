import { Type } from '@angular/core';
import { DefaultExport } from '@angular/router';

/**
 * Check if a value is a default export.
 *
 * @param a - The value to check.
 * @returns `true` if the value is a default export, `false` otherwise.
 */
export function isDefaultExport<T>(
	a: Type<T> | DefaultExport<Type<T>>
): a is DefaultExport<Type<T>> {
	return !!(a as DefaultExport<Type<T>>).default;
}
