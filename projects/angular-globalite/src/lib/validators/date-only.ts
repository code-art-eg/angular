import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isEmptyValue } from '../util/is-empty-value';
import { isDateOnly } from '../util/is-date-only';

/**
 * Validator that requires the control value to be a valid date (without time).
 *
 * @returns An error object with the `dateOnly` property if the validation check fails, otherwise `null`.
 */
export function dateOnly(c: AbstractControl): ValidationErrors | null {
	if (isEmptyValue(c.value)) {
		return null;
	}
	if (c.value instanceof Date) {
		return c.value.getHours() === 0 &&
			c.value.getMinutes() === 0 &&
			c.value.getSeconds() === 0 &&
			c.value.getMilliseconds() === 0
			? null
			: { dateOnly: true };
	} else if (!isDateOnly(c.value)) {
		return { dateOnly: true };
	}
	return null;
}
