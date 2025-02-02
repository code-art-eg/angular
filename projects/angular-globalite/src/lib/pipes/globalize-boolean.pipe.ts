import { Pipe, PipeTransform } from '@angular/core';
import { BaseGlobalizePipe } from './base-globalize-pipe';
import { BooleanFormatter, booleanFormatter } from '@code-art-eg/globalite';

/**
 * Pipe to format boolean values using Globalite.
 *
 * @example
 * {{ true | gbool }} Uses the default boolean format and current locale. shows 'yes' in English, 'ja' in German, etc.
 * {{ false | gbool }} Uses the default boolean format and current locale. shows 'no' in English, 'nein' in German, etc.
 * {{ true | gbool:'': 'de' }} Uses the default boolean format and the locale 'de'. (shows 'ja')
 */
@Pipe({
	name: 'gbool',
	pure: false,
})
export class GlobalizeBooleanPipe
	extends BaseGlobalizePipe<boolean, never>
	implements PipeTransform
{
	#booleanFormatter?: BooleanFormatter;
	#locale?: string;

	/**
	 * Transforms the input boolean value to a formatted string based on the provided locale.
	 *
	 * @param {boolean} input - The boolean value to format.
	 * @param {string} _ - Unused parameter for options format.
	 * @param {string} locale - The locale to use for formatting.
	 * @returns {string} The formatted boolean value.
	 */
	protected override transformValue(
		input: boolean,
		_: string,
		locale: string
	): string {
		if (!this.#booleanFormatter || this.#locale !== locale) {
			this.#booleanFormatter = booleanFormatter(locale);
			this.#locale = locale;
		}

		return this.#booleanFormatter(input);
	}

	/**
	 * Gets the default options or format for the boolean pipe.
	 *
	 * @returns {string} The default format.
	 */
	protected override getDefaultOptionsOrFormat(): string {
		return '';
	}
}
