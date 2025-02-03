import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isEmptyValue } from '../util/is-empty-value';

/**
 * Validator that requires the control value to have no trailing spaces.
 *
 * @returns An error object with the `noTrailingSpace` property if the validation check fails, otherwise `null`.
 */
export function noTrailingSpace(c: AbstractControl): ValidationErrors | null {
	if (isEmptyValue(c.value)) {
		return null;
	}
	if (/\s$/.test(c.value)) {
		return { noTrailingSpace: true };
	}
	return null;
}
