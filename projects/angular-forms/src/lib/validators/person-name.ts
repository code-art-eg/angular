import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isEmptyValue } from '../util/is-empty-value';

const letterExpression = '(?:\\p{M}|\\p{Ll}|\\p{Lu}|\\p{Lt}|\\p{Lo}|\\p{Lm})';

const nameRx = new RegExp(
	`^${letterExpression}+(?:-|'| |${letterExpression})*$`,
	'u'
);

/**
 * Validator that requires the control value to be a person name.
 *
 * @returns An error object with the `personName` property if the validation check fails, otherwise `null`.
 */
export function personName(c: AbstractControl): ValidationErrors | null {
	if (isEmptyValue(c.value)) {
		return null;
	}
	if (!nameRx.test(c.value)) {
		return { personName: true };
	}
	return null;
}
