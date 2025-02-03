import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isEmptyValue } from '../util/is-empty-value';

const validSubnetMasks = [
	'255.255.255.255',
	'255.255.255.254',
	'255.255.255.252',
	'255.255.255.248',
	'255.255.255.240',
	'255.255.255.224',
	'255.255.255.192',
	'255.255.255.128',
	'255.255.255.0',
	'255.255.254.0',
	'255.255.252.0',
	'255.255.248.0',
	'255.255.240.0',
	'255.255.224.0',
	'255.255.192.0',
	'255.255.128.0',
	'255.255.0.0',
	'255.254.0.0',
	'255.252.0.0',
	'255.248.0.0',
	'255.240.0.0',
	'255.224.0.0',
	'255.192.0.0',
	'255.128.0.0',
	'255.0.0.0',
	'254.0.0.0',
	'252.0.0.0',
	'248.0.0.0',
	'240.0.0.0',
	'224.0.0.0',
	'192.0.0.0',
	'128.0.0.0',
	'0.0.0.0',
];

/**
 * Validator that requires the control value to be a valid IPv4 subnet mask.
 *
 * @returns An error object with the `ip4SubnetMask` property if the validation check fails, otherwise `null`.
 */
export function ip4SubnetMask(c: AbstractControl): ValidationErrors | null {
	if (isEmptyValue(c.value)) {
		return null;
	}
	if (!validSubnetMasks.includes(c.value)) {
		return { subnet: true };
	}
	return null;
}
