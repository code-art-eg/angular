import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isEmptyValue } from '../util/is-empty-value';

const ipRx =
	/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

/**
 * Validator that requires the control value to be a valid IP address.
 *
 * @returns An error object with the `ip4` property if the validation check fails, otherwise `null`.
 */
export function ip4Address(c: AbstractControl): ValidationErrors | null {
	if (isEmptyValue(c.value)) {
		return null;
	}
	if (!ipRx.test(c.value)) {
		return { ip4: true };
	}
	return null;
}
