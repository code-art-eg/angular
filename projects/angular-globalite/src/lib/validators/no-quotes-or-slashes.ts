import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isEmptyValue } from '../util/is-empty-value';

/**
 * Validator that requires the control value to have no quotes or slashes.
 *
 * @returns An error object with the `noQuotesOrSlashes` property if the validation check fails, otherwise `null`.
 */
export function noQuotesOrSlashes(c: AbstractControl): ValidationErrors | null {
	if (isEmptyValue(c.value)) {
		return null;
	}
	if (/['"\\/]/.test(c.value)) {
		return { noQuotesOrSlashes: true };
	}
	return null;
}
