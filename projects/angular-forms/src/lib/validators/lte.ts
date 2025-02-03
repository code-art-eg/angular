import { ValidatorFn } from '@angular/forms';
import { compareValidator } from '../util/compare-validator';

/**
 * A validator that requires the value to be less than or equal to the other value.
 * @param otherKey The key of the other control.
 * @returns A validator function that returns an error map with the
 * `lte` property if the validation check fails, otherwise `null`.
 */
export function lte(otherKey: string | number): ValidatorFn {
	return compareValidator('lte', otherKey, r => r <= 0);
}
