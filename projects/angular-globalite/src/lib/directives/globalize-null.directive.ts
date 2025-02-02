import { Directive, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseConverterDirective } from './base-converter-directive';
import { ControlValue, CoercedValue } from '../types';
import { isWhitespaceOrEmpty } from '../util/is-whitespace-or-empty';

/**
 * A directive that converts empty strings to `null`.
 *
 */
@Directive({
	providers: [
		{
			multi: true,
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => GlobalizeNullDirective),
		},
	],
	selector: '[glbToNull]',
})
export class GlobalizeNullDirective extends BaseConverterDirective<string> {
	protected override coerceValue(
		v: ControlValue<string>
	): CoercedValue<string> {
		if (v === null || isWhitespaceOrEmpty(v)) {
			return null;
		}
		return v;
	}
	protected override formatValue(v: string): string {
		if (v === null) {
			return '';
		}
		return v;
	}
	protected override inputsEqual(v1: string, v2: string): boolean {
		return v1 === v2;
	}
}
