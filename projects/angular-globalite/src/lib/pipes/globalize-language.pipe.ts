import { Pipe, PipeTransform } from '@angular/core';
import { BaseGlobalizePipe } from './base-globalize-pipe';
import { getLanguageName } from '@code-art-eg/globalite';

/**
 * Pipe to format language names using Globalite.
 *
 * @example
 * {{ languageCode | glanguage }} Uses the default locale.
 * {{ languageCode | glanguage:'' }} Uses the default locale.
 * {{ languageCode | glanguage:'':'fr' }} Uses the locale 'fr'.
 */
@Pipe({
	name: 'glanguage',
	pure: false,
})
export class GlobalizeLanguagePipe
	extends BaseGlobalizePipe<string, never>
	implements PipeTransform
{
	protected override transformValue(
		input: string,
		_: string,
		locale: string
	): string {
		return getLanguageName(locale, input);
	}

	protected override getDefaultOptionsOrFormat(): string {
		return '';
	}
}
