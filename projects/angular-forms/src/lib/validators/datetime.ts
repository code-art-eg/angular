import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isEmptyValue } from '../util/is-empty-value';

/**
 * Validator that requires the control value to be a valid date/time (Date object).
 *
 * @returns An error object with the `date` property if the validation check fails, otherwise `null`.
 */
export function datetime(c: AbstractControl): ValidationErrors | null {
	if (isEmptyValue(c.value)) {
		return null;
	}
	if (c.value instanceof Date) {
		return null;
	}
	return { datetime: true };
}
