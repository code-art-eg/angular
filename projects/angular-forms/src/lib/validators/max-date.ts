import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isDateOnly } from '@code-art-eg/angular-globalite';
import { compareDates } from '../util/compare-dates';
import type { DateOnly } from '@code-art-eg/angular-globalite';

/**
 * Returns a validator function that checks if the control value is a date before the specified maximum date.
 * @param maxDate The maximum date.
 */
export function maxDate(maxDate: Date | DateOnly) {
	return (control: AbstractControl): ValidationErrors | null => {
		if (!control.value) {
			return null;
		}
		if (control.value instanceof Date || isDateOnly(control.value)) {
			return compareDates(control.value, maxDate) <= 0
				? null
				: { maxDate: true };
		}
		return null;
	};
}
