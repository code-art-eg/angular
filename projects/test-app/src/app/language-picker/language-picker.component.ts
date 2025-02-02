import { Component, inject } from '@angular/core';
import { PickerComponent, PickerOption } from '@code-art-eg/angular-bootstrap';
import { LocaleValidatorService } from '../../../../angular-globalite/src/lib/services/locale-validator.service';
import { LocaleService } from '@code-art-eg/angular-globalite';
import { getLanguageName } from '@code-art-eg/globalite';

@Component({
	selector: 'app-language-picker',
	imports: [PickerComponent],
	templateUrl: './language-picker.component.html',
})
export class LanguagePickerComponent {
	readonly #languages = inject(LocaleValidatorService).getSupportedLocales();
	readonly localeService = inject(LocaleService);
	options: PickerOption[];

	constructor() {
		this.options = this.#languages.map(locale => ({
			value: locale,
			label: getLanguageName(locale, locale),
		}));
	}
}
