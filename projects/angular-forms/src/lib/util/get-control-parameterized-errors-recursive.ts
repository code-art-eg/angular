import { AbstractControl } from '@angular/forms';
import type { ParameterizedMessage } from '../types';
import { controlActionRecursive } from './control-action-recursive';
import { getControlParameterizedErrors } from './get-control-parameterized-errors';

export function getControlParameterizedErrorsRecursive(
	ctl: AbstractControl,
	onlyWhenTouched: boolean,
	prefix?: string
): ParameterizedMessage[] {
	const errors: ParameterizedMessage[] = [];
	controlActionRecursive(ctl, c => {
		if (!onlyWhenTouched || c.touched) {
			const ctlErrors = getControlParameterizedErrors(c, prefix);
			errors.push(...ctlErrors);
		}
	});

	return errors;
}
