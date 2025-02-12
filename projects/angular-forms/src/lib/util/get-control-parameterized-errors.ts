import { AbstractControl } from '@angular/forms';
import type { ParameterizedMessage } from '../types';
import { getControlKey } from './get-control-key';
import { FORM_FIELD_CONTEXT, FORM_VALIDATION_CONTEXT } from '../constants';

export function getControlParameterizedErrors(
	ctl: AbstractControl,
	prefix?: string
): ParameterizedMessage[] {
	const result: ParameterizedMessage[] = [];
	if (!ctl?.errors) {
		return result;
	}

	let controlKey = getControlKey(ctl);

	if (controlKey === null) {
		controlKey = 'field';
	} else if (prefix) {
		controlKey = `${prefix}.${controlKey}`;
	} else {
		controlKey = `${controlKey}`;
	}

	for (const key of Object.getOwnPropertyNames(ctl.errors)) {
		const errorVal = ctl.errors[key];
		if (typeof errorVal === 'string') {
			result.push({
				messageKey: errorVal,
				context: FORM_VALIDATION_CONTEXT,
				parameters: false,
			});
		} else if (errorVal && typeof errorVal === 'object') {
			result.push({
				messageKey: key,
				context: FORM_VALIDATION_CONTEXT,
				parameters: {
					key: {
						messageKey: controlKey,
						context: FORM_FIELD_CONTEXT,
					},
					...errorVal,
				},
			});
		} else {
			result.push({
				messageKey: key,
				context: FORM_VALIDATION_CONTEXT,
				parameters: {
					key: {
						messageKey: controlKey,
						context: FORM_FIELD_CONTEXT,
					},
				},
			});
		}
	}

	return result;
}
