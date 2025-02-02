import { Directive, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CoercedValue, ControlValue } from '../types';
import { isWhitespaceOrEmpty } from '../util/is-whitespace-or-empty';
import { numberFormatter, numberParser } from '@code-art-eg/globalite';
import { BaseConverterDirective } from './base-converter-directive';

/**
 * Directive to convert and format integer values using Globalite.
 * When the input value is a string, it will be parsed using the current locale.
 * And the value for the form control will be a number if the string is a valid integer.
 * When the value of the form control is a number,
 * it will be formatted using the current locale and the specified format
 * and written to the input element.
 *
 * An empty string or a string with only whitespace will be converted to `null`.
 *
 * @example
 * <input type="text" glbToInteger [formControl]="formControl" />
 *
 */
@Directive({
	providers: [
		{
			multi: true,
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => GlobalizeIntegerDirective),
		},
	],
	selector: '[glbToInteger]',
})
export class GlobalizeIntegerDirective extends BaseConverterDirective<number> {
	protected coerceValue(v: ControlValue<number>): CoercedValue<number> {
		if (v === null) {
			return null;
		} else if (typeof v === 'string' && isWhitespaceOrEmpty(v)) {
			return null;
		}
		let val: number | null;
		if (typeof v === 'number') {
			val = v;
		} else {
			const np = numberParser(this.localeService.currentLocale, 'd');
			val = np(v);
		}
		const valid =
			typeof val === 'number' &&
			!isNaN(val) &&
			isFinite(val) &&
			Number.isInteger(val);
		return valid ? val : undefined;
	}

	protected inputsEqual(v1: number, v2: number): boolean {
		return v1 === v2;
	}

	protected override formatValue(v: number): string {
		if (isNaN(v) || !isFinite(v)) {
			return '';
		}
		const nf = numberFormatter(this.localeService.currentLocale, 'd');
		return nf(v);
	}
}
