import { BaseGlobalizePipe } from './base-globalize-pipe';
import { numberFormatter, NumberFormatter } from '@code-art-eg/globalite';

export abstract class BaseNumberPipe extends BaseGlobalizePipe<
	number,
	Intl.NumberFormatOptions
> {
	#numberFormatter?: NumberFormatter;
	#optionsOrFormat?: Intl.NumberFormatOptions | string;
	#locale?: string;

	protected override transformValue(
		input: number,
		optionsOrFormat: string | Intl.NumberFormatOptions,
		locale: string
	): string {
		if (
			!this.#numberFormatter ||
			this.#optionsOrFormat !== optionsOrFormat ||
			this.#locale !== locale
		) {
			if (typeof optionsOrFormat === 'string') {
				this.#numberFormatter = numberFormatter(
					locale,
					optionsOrFormat
				);
			} else {
				this.#numberFormatter = numberFormatter(
					locale,
					optionsOrFormat
				);
			}

			this.#optionsOrFormat = optionsOrFormat;
			this.#locale = locale;
		}

		return this.#numberFormatter(input);
	}
}
