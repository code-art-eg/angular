import { Pipe, PipeTransform } from '@angular/core';
import { BaseDatePipe } from './base-date-pipe';

/**
 * Pipe to format dates using Globalite.
 *
 * @example
 * {{ date | gdate }} Uses the default date format and current locale.
 * {{ date | gdate:'d' }} Uses the date format 'd' and current locale (11/5/2008).
 * {{ date | gdate:'F':'fr' }} Uses the date format 'F' and the locale 'fr'.
 */
@Pipe({
	name: 'gdate',
	pure: false,
})
export class GlobalizeDatePipe extends BaseDatePipe implements PipeTransform {
	protected override getDefaultOptionsOrFormat():
		| string
		| Intl.DateTimeFormatOptions {
		return 'd';
	}
}
