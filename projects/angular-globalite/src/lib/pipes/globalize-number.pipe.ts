import { Pipe, PipeTransform } from '@angular/core';
import { BaseNumberPipe } from './base-number-pipe';

/**
 * Pipe to format numbers using Globalite.
 *
 * @example
 * {{ value | gnumber }} Uses the default number format and current locale.
 * {{ value | gnumber:'f' }} Uses the number format 'f' and current locale.
 * {{ value | gnumber:'f':'de' }} Uses the number format 'f' and the locale 'de'.
 */
@Pipe({
	name: 'gnumber',
	pure: false,
})
export class GlobalizeNumberPipe
	extends BaseNumberPipe
	implements PipeTransform
{
	protected override getDefaultOptionsOrFormat():
		| string
		| Intl.NumberFormatOptions {
		return 'n';
	}
}
