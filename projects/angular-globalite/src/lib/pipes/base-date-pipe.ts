import { BaseGlobalizePipe } from './base-globalize-pipe';
import { dateFormatter, DateFormatter } from '@code-art-eg/globalite';
import type { DateOnly } from '@code-art-eg/globalite';
import { inject } from '@angular/core';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';

export abstract class BaseDatePipe extends BaseGlobalizePipe<
	Date | DateOnly,
	Intl.DateTimeFormatOptions
> {
	#dateFormatter?: DateFormatter;
	#optionsOrFormat?: Intl.DateTimeFormatOptions | string;
	#locale?: string;

	readonly #timeZone = inject(DATE_PIPE_DEFAULT_OPTIONS, {
		optional: true,
	})?.timezone;

	protected override transformValue(
		input: Date | DateOnly,
		optionsOrFormat: string | Intl.DateTimeFormatOptions,
		locale: string
	): string {
		if (
			!this.#dateFormatter ||
			this.#optionsOrFormat !== optionsOrFormat ||
			this.#locale !== locale
		) {
			if (typeof optionsOrFormat === 'string') {
				this.#dateFormatter = dateFormatter(
					locale,
					optionsOrFormat,
					this.#timeZone
				);
			} else {
				this.#dateFormatter = dateFormatter(locale, optionsOrFormat);
			}

			this.#optionsOrFormat = optionsOrFormat;
			this.#locale = locale;
		}

		return this.#dateFormatter(input);
	}
}
