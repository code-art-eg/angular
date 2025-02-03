import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isEmptyValue } from '../util/is-empty-value';

const colorRx = /^#(?:[a-fA-F0-9]{3}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$/;

/**
 * Validator that requires the control value to be a valid color code.
 *
 * @returns An error object with the `color` property if the validation check fails, otherwise `null`.
 */
export function color(control: AbstractControl): ValidationErrors | null {
	if (isEmptyValue(control.value)) {
		return null;
	}
	return colorRx.test(control.value) ? null : { color: true };
}
