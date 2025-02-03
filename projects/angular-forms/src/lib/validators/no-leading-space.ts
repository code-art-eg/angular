import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isEmptyValue } from '../util/is-empty-value';

/**
 * Validator that requires the control value to have no leading spaces.
 *
 * @returns An error object with the `noLeadingSpace` property if the validation check fails, otherwise `null`.
 */
export function noLeadingSpace(c: AbstractControl): ValidationErrors | null {
	if (isEmptyValue(c.value)) {
		return null;
	}
	if (/^\s/.test(c.value)) {
		return { noLeadingSpace: true };
	}
	return null;
}
