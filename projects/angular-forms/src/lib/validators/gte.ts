import { ValidatorFn } from '@angular/forms';
import { compareValidator } from '../util/compare-validator';

/**
 * A validator that requires the value to be greater than or equal to the other value.
 * @param otherKey The key of the other control.
 * @returns A validator function that returns an error map with the
 * `gte` property if the validation check fails, otherwise `null`.
 */
export function gte(otherKey: string | number): ValidatorFn {
	return compareValidator('gte', otherKey, r => r >= 0);
}
