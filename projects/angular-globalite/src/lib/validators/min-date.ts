import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isDateOnly } from '../util/is-date-only';
import { compareDates } from '../util/compare-dates';
import { DateOnly } from '../types';

/**
 * return a validator function that checks if the control value is a date after the specified minimum date.
 * @param minDate The minimum date.
 */
export function minDate(minDate: Date | DateOnly) {
	return (control: AbstractControl): ValidationErrors | null => {
		if (!control.value) {
			return null;
		}
		if (control.value instanceof Date || isDateOnly(control.value)) {
			return compareDates(control.value, minDate) >= 0
				? null
				: { minDate: true };
		}
		return null;
	};
}
