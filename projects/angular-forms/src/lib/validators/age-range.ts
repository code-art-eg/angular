import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isEmptyValue } from '../util/is-empty-value';
import { getAge } from '../util/get-age';
import { isDateOnly } from '@code-art-eg/globalite';

export function ageRange(minAge: number, maxAge: number): ValidatorFn {
	return (c: AbstractControl) => {
		if (isEmptyValue(c.value)) {
			return null;
		}
		if (c.value instanceof Date || isDateOnly(c.value)) {
			const age = getAge(c.value);
			return age >= minAge && age <= maxAge
				? null
				: { ageRange: { minAge, maxAge, actual: age } };
		} else {
			return { ageRange: { minAge, maxAge, actual: c.value } };
		}
	};
}
