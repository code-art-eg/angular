import { Inject, Injectable } from '@angular/core';
import { LocaleProvider } from '../types';
import { LocaleValidatorService } from './locale-validator.service';
import { combineLatest, map, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { normalizeLocaleName } from '../util/normalize-locale-name';
import { LOCALE_PROVIDERS_TOKEN } from '../provider-tokens';

/**
 * Service to manage the current locale for the application.
 */
@Injectable({
	providedIn: 'root',
})
export class LocaleService {
	readonly locale$: Observable<string>;
	#currentLocale: string;

	/**
	 * Constructor.
	 *
	 * @param providers - The locale providers.
	 * @param localeValidator - The locale validator.
	 */
	constructor(
		@Inject(LOCALE_PROVIDERS_TOKEN)
		private readonly providers: LocaleProvider[],
		private readonly localeValidator: LocaleValidatorService
	) {
		this.locale$ = combineLatest(
			providers.map(provider => provider.locale$)
		).pipe(map(locales => this.#getBestLocale(locales)));

		this.#currentLocale = this.#getBestLocale(
			this.providers.map(provider => provider.locale)
		);
		this.locale$.pipe(takeUntilDestroyed()).subscribe(locale => {
			this.#currentLocale = locale;
		});
	}

	/**
	 * Gets the current locale.
	 */
	get currentLocale(): string {
		return this.#currentLocale;
	}

	/**
	 * Sets the current locale.
	 *
	 * @param {string} locale - The value locale to set.
	 * @remarks the locale is set on all providers that can write.
	 * If the locale is not supported, the default locale is set.
	 * See {@link LocaleValidatorService}.
	 */
	set currentLocale(locale: string) {
		let val = this.localeValidator.getSupportedLocale(locale);
		if (!val) {
			val = this.localeValidator.getDefaultLocale();
		}
		for (const provider of this.providers) {
			if (provider.canWrite) {
				provider.setLocale(val);
			}
		}
	}

	#getBestLocale(locales: (string | null)[]): string {
		for (let i = locales.length - 1; i >= 0; i--) {
			let locale = locales[i];
			if (!locale) {
				continue;
			}
			locale = normalizeLocaleName(locale);
			const supportedLocale =
				this.localeValidator.getSupportedLocale(locale);
			if (supportedLocale) {
				return supportedLocale;
			}
		}
		return this.localeValidator.getDefaultLocale();
	}
}
