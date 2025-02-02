import { Pipe, PipeTransform } from '@angular/core';
import { BaseGlobalizePipe } from './base-globalize-pipe';
import { MonthDisplay, WeekdayDisplay } from '../types';
import { getDayName } from '@code-art-eg/globalite';

/**
 * Pipe to format day names using Globalite.
 *
 * @example
 * {{ dayNumber | gday }} Uses the default day format and current locale.
 * {{ dayNumber | gday:'short' }} Uses the day format 'short' and current locale.
 * {{ dayNumber | gday:'long':'fr' }} Uses the day format 'long' and the locale 'fr'.
 */
@Pipe({
	name: 'gday',
	pure: false,
})
export class GlobalizeDayPipe
	extends BaseGlobalizePipe<number, WeekdayDisplay>
	implements PipeTransform
{
	protected override transformValue(
		input: number,
		optionsFormat: string,
		locale: string
	): string {
		let format: MonthDisplay = 'long';
		if (optionsFormat === '') {
			format = 'long';
		} else if (optionsFormat === 'D') {
			format = 'narrow';
		} else if (optionsFormat === 'DD') {
			format = 'short';
		} else if (optionsFormat === 'DDD') {
			format = 'short';
		} else if (optionsFormat === 'DDDD') {
			format = 'long';
		} else if (
			optionsFormat === 'long' ||
			optionsFormat === 'short' ||
			optionsFormat === 'narrow'
		) {
			format = optionsFormat;
		} else {
			throw new Error(
				`Invalid month format: ${optionsFormat}. Supported formats are 'long', 'short', 'narrow', 'D', 'DD', 'DDD', 'DDDD'.`
			);
		}

		return getDayName(locale, input, format);
	}
	protected override getDefaultOptionsOrFormat(): string {
		return 'DDDD';
	}
}
