import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isEmptyValue } from '../util/is-empty-value';

/**
 * Validator that requires the control value to have no consecutive spaces.
 *
 * @returns An error object with the `noConsecutiveSpaces` property if the validation check fails, otherwise `null`.
 */
export function noConsecutiveSpaces(
	c: AbstractControl
): ValidationErrors | null {
	if (isEmptyValue(c.value)) {
		return null;
	}
	if (/\s{2,}/.test(c.value)) {
		return { noConsecutiveSpaces: true };
	}
	return null;
}
