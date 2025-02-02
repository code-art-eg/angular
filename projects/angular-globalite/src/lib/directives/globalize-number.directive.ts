import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseConverterDirective } from './base-converter-directive';
import { CoercedValue, ControlValue } from '../types';
import { isWhitespaceOrEmpty } from '../util/is-whitespace-or-empty';
import { numberFormatter, numberParser } from '@code-art-eg/globalite';

/**
 * Directive to convert and format number values using Globalite.
 * When the input value is a string, it will be parsed using the current locale.
 * And the value for the form control will be a number.
 * When the value of the form control is a number,
 * it will be formatted using the current locale and the specified format
 * and written to the input element.
 *
 * An empty string or a string with only whitespace will be converted to `null`.
 *
 * @example
 * <input type="text" glbToNumber [formControl]="formControl" />
 *
 * @example
 *
 */
@Directive({
	providers: [
		{
			multi: true,
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => GlobalizeNumberDirective),
		},
	],
	selector: '[glbToNumber]',
})
export class GlobalizeNumberDirective extends BaseConverterDirective<number> {
	/**
	 * The format to use when formatting the number.
	 * If not specified, the default format 'n' will be used.
	 * See the Globalite documentation for more information about number formats.
	 */
	@Input('glbToNumber') public format = 'n';

	protected coerceValue(v: ControlValue<number>): CoercedValue<number> {
		let fmt = this.format;
		if (fmt === '') {
			fmt = 'n';
		}
		if (v === null) {
			return null;
		} else if (typeof v === 'string' && isWhitespaceOrEmpty(v)) {
			return null;
		}
		let val: number | null;
		if (typeof v === 'number') {
			val = v;
		} else {
			const np = numberParser(this.localeService.currentLocale, fmt);
			val = np(v);
		}
		const valid = typeof val === 'number' && !isNaN(val) && isFinite(val);
		return valid ? val : undefined;
	}

	protected inputsEqual(v1: number, v2: number): boolean {
		return v1 === v2;
	}

	protected override formatValue(v: number): string {
		let fmt = this.format;
		if (fmt === '') {
			fmt = 'n';
		}
		if (isNaN(v) || !isFinite(v)) {
			return '';
		}
		const nf = numberFormatter(this.localeService.currentLocale, fmt);
		return nf(v);
	}
}
