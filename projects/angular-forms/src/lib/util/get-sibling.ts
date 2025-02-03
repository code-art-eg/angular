import { AbstractControl, FormArray } from '@angular/forms';

export function getSibling(
	c: AbstractControl,
	siblingNameOrIndex: string | number
): AbstractControl | null {
	if (!c.parent) {
		return null;
	}
	if (c.parent instanceof FormArray) {
		if (typeof siblingNameOrIndex !== 'number') {
			throw new Error('FormArray sibling must be accessed by index.');
		}
		if (siblingNameOrIndex < 0) {
			throw new Error(
				'FormArray sibling index must be a non-negative integer.'
			);
		}
		return c.parent.controls[siblingNameOrIndex] || null;
	}
	if (typeof siblingNameOrIndex !== 'string') {
		throw new Error('FormControl sibling must be accessed by name.');
	}
	if (
		Object.prototype.hasOwnProperty.call(
			c.parent.controls,
			siblingNameOrIndex
		)
	) {
		return c.parent.controls[siblingNameOrIndex];
	}
	return null;
}
