import { ValidatorFn } from '@angular/forms';
import { compareValidator } from '../util/compare-validator';

/**
 * A validator that requires the value to be greater than the other value.
 * @param otherKey The key of the other control.
 * @returns A validator function that returns an error map with the
 * `gt` property if the validation check fails, otherwise `null`.
 */
export function gt(otherKey: string | number): ValidatorFn {
	return compareValidator('gt', otherKey, r => r > 0);
}
