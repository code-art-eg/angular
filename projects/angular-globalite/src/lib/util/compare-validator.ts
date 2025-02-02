import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEmptyValue } from './is-empty-value';
import { getSibling } from './get-sibling';
import { isDateOnly } from './is-date-only';
import { compareDates } from './compare-dates';
import { FORM_FIELD_CONTEXT } from '../constants';

export function compareValidator(
	name: string,
	otherKey: string | number,
	operator: (r: number) => boolean
): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const compareResult = compareValues(control, otherKey);
		if (compareResult === null || operator(compareResult)) {
			return null;
		}

		let n = name;
		if (control.value instanceof Date || isDateOnly(control.value)) {
			n += 'Date';
		}
		const res: Record<string, unknown> = {};
		res[n] = {
			otherKey: {
				messageKey: otherKey,
				context: FORM_FIELD_CONTEXT,
			},
		};
		return res;
	};
}

function compareValues(
	c: AbstractControl,
	otherKey: string | number
): number | null {
	if (isEmptyValue(c.value)) {
		return null;
	}
	const otherCtl = getSibling(c, otherKey);
	if (!otherCtl) {
		return null;
	}
	if (isEmptyValue(otherCtl.value)) {
		return null;
	}
	if (typeof c.value === 'number' && typeof otherCtl.value === 'number') {
		return c.value - otherCtl.value;
	}
	if (
		(c.value instanceof Date || isDateOnly(c.value)) &&
		(otherCtl.value instanceof Date || isDateOnly(otherCtl.value))
	) {
		return compareDates(c.value, otherCtl.value);
	}
	if (typeof c.value === 'string' && typeof otherCtl.value === 'string') {
		return c.value.localeCompare(otherCtl.value);
	}

	return null;
}
