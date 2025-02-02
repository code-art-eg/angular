import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isDateOnly } from '../util/is-date-only';
import { compareDates } from '../util/compare-dates';

/**
 * Returns a validator function that checks if the control value is a date in the past.
 */
export function pastDate() {
	return (control: AbstractControl): ValidationErrors | null => {
		if (!control.value) {
			return null;
		}
		const now = new Date();
		if (control.value instanceof Date || isDateOnly(control.value)) {
			return compareDates(control.value, now) < 0
				? null
				: { pastDate: true };
		}
		return null;
	};
}
