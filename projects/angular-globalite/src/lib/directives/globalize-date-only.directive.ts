import { Directive, forwardRef } from '@angular/core';
import { BaseConverterDirective } from './base-converter-directive';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CoercedValue, ControlValue, DateOnly } from '../types';
import { isWhitespaceOrEmpty } from '../util/is-whitespace-or-empty';
import { dateFormatter, dateParser } from '@code-art-eg/globalite';
import { isDateOnly } from '../util/is-date-only';

/**
 * Directive to convert and format DateOnly values using Globalite.
 * When the input value is a string, it will be parsed using the current locale.
 * And the value for the form control will be a DateOnly object if the string is a valid date.
 * When the value of the form control is a DateOnly object,
 * it will be formatted using the current locale and the specified format
 * and written to the input element.
 *
 * An empty string or a string with only whitespace will be converted to `null`.
 *
 * {@link DateOnly} objects are used to represent dates without time information.
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
			useExisting: forwardRef(() => GlobalizeDateOnlyDirective),
		},
	],
	selector: '[glbToDateOnly]',
})
export class GlobalizeDateOnlyDirective extends BaseConverterDirective<DateOnly> {
	/**
	 * @inheritDoc
	 */
	protected coerceValue(v: ControlValue<DateOnly>): CoercedValue<DateOnly> {
		if (v === null) {
			return null;
		} else if (typeof v === 'string' && isWhitespaceOrEmpty(v)) {
			return null;
		}
		let val: DateOnly | null;
		if (isDateOnly(v)) {
			val = v;
		} else {
			const dp = dateParser(this.localeService.currentLocale, 'd');
			const date = dp(v);
			if (date) {
				val = {
					year: date.getFullYear(),
					month: date.getMonth() + 1,
					day: date.getDate(),
				};
			} else {
				return undefined;
			}
		}
		return val;
	}

	protected inputsEqual(v1: DateOnly, v2: DateOnly): boolean {
		return (
			v1.year === v2.year && v1.month === v2.month && v1.day === v2.day
		);
	}

	protected override formatValue(v: DateOnly): string {
		const date = new Date(v.year, v.month - 1, v.day);
		const df = dateFormatter(this.localeService.currentLocale, 'd');
		return df(date);
	}
}
