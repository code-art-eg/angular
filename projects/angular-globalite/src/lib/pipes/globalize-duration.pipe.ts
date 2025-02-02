import { Pipe, PipeTransform } from '@angular/core';
import { BaseGlobalizePipe } from './base-globalize-pipe';
import { durationFormatter, NumberFormatter } from '@code-art-eg/globalite';

/**
 * Pipe to format durations using Globalite.
 *
 * @example
 * {{ duration | gduration }} Uses the default duration format and current locale.
 * {{ duration | gduration:'h:mm:ss' }} Uses the duration format 'h:mm:ss' and current locale.
 * {{ duration | gduration:'h:mm:ss':'fr' }} Uses the duration format 'h:mm:ss' and the locale 'fr'.
 */
@Pipe({
	name: 'gduration',
	pure: false,
})
export class GlobalizeDurationPipe
	extends BaseGlobalizePipe<number, string>
	implements PipeTransform
{
	#durationFormatter?: NumberFormatter;
	#optionsOrFormat?: string;
	#locale?: string;

	protected override transformValue(
		input: number,
		optionsOrFormat: string,
		locale: string
	): string {
		if (
			!this.#durationFormatter ||
			this.#optionsOrFormat !== optionsOrFormat ||
			this.#locale !== locale
		) {
			this.#durationFormatter = durationFormatter(
				locale,
				optionsOrFormat
			);
			this.#optionsOrFormat = optionsOrFormat;
			this.#locale = locale;
		}

		return this.#durationFormatter(input);
	}
	protected override getDefaultOptionsOrFormat(): string {
		return 'constant';
	}
}
