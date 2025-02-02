import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseConverterDirective } from './base-converter-directive';
import { CoercedValue, ControlValue } from '../types';
import { isWhitespaceOrEmpty } from '../util/is-whitespace-or-empty';
import { dateFormatter, dateParser } from '@code-art-eg/globalite';

/**
 * Directive to convert and format Date values using Globalite.
 * When the input value is a string, it will be parsed using the current locale.
 * And the value for the form control will be a Date if the string is a valid date.
 * When the value of the form control is a Date,
 * it will be formatted using the current locale and the specified format
 * and written to the input element.
 *
 * An empty string or a string with only whitespace will be converted to `null`.
 *
 * @example
 * <input type="text" glbToDateTime [formControl]="formControl" />
 *
 */
@Directive({
	providers: [
		{
			multi: true,
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => GlobalizeDateTimeDirective),
		},
	],
	selector: '[glbToDateTime]',
})
export class GlobalizeDateTimeDirective extends BaseConverterDirective<Date> {
	/**
	 * The format to use when formatting the date.
	 * If not specified, the 'g' format will be used.
	 * See Globalite documentation for more information about the available formats.
	 */
	@Input('glbToDateTime') public format = 'g';

	/**
	 * The time zone to use when parsing and formatting the date.
	 *
	 * If not specified, the default time zone of the browser will be used.
	 *
	 * Note that Globalite time zone support is not working as expected but this is added for the future.
	 */
	@Input() public timeZone: string | undefined;

	protected coerceValue(v: ControlValue<Date>): CoercedValue<Date> {
		let fmt = this.format;
		if (fmt === '') {
			fmt = 'g';
		}

		if (v === null) {
			return null;
		} else if (typeof v === 'string' && isWhitespaceOrEmpty(v)) {
			return null;
		}
		let val: Date | null;
		if (v instanceof Date) {
			val = v;
		} else {
			const dp = dateParser(
				this.localeService.currentLocale,
				fmt,
				this.timeZone
			);
			val = dp(v);
		}
		const valid = val instanceof Date;
		return valid ? val : undefined;
	}

	protected inputsEqual(v1: Date, v2: Date): boolean {
		return v1.valueOf() === v2.valueOf();
	}

	protected override formatValue(v: Date): string {
		let fmt = this.format;
		if (fmt === '') {
			fmt = 'g';
		}
		const df = dateFormatter(
			this.localeService.currentLocale,
			fmt,
			this.timeZone
		);
		return df(v);
	}
}
