import { ValidatorFn } from '@angular/forms';
import { compareValidator } from '../util/compare-validator';

/**
 * A validator that requires the value to be not equal to the other value.
 * @param otherKey The key of the other control.
 * @returns A validator function that returns an error map with the
 * `neq` property if the validation check fails, otherwise `null`.
 */
export function neq(otherKey: string | number): ValidatorFn {
	return compareValidator('neq', otherKey, r => r !== 0);
}
