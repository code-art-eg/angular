import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isEmptyValue } from '../util/is-empty-value';

/**
 * Validator that requires the control value to be a valid number.
 *
 * @returns An error object with the `integer` property if the validation check fails, otherwise `null`.
 */
export function numeric(c: AbstractControl): ValidationErrors | null {
	if (isEmptyValue(c.value)) {
		return null;
	}
	if (typeof c.value !== 'number' || isNaN(c.value) || !isFinite(c.value)) {
		return { integer: true };
	}
	return null;
}
