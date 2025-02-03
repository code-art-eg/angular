import { isEmptyValue } from '../util/is-empty-value';
import { AbstractControl, ValidationErrors } from '@angular/forms';

const phoneRx = /^(\(?\+?[0-9]*\)?)?[0-9_\-/\\ ()]*$/;

/**
 * Validator that requires the control value to be a valid phone number.
 *
 * @returns An error object with the `phone` property if the validation check fails, otherwise `null`.
 */
export function phone(c: AbstractControl): ValidationErrors | null {
	if (isEmptyValue(c.value)) {
		return null;
	}
	if (!phoneRx.test(c.value)) {
		return { phone: true };
	}

	if (c.value.length < 6) {
		return { phone: true };
	}

	if (c.value.length > 18) {
		return { phone: true };
	}
	return null;
}
