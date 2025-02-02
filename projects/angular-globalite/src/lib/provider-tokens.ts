// noinspection ES6PreferShortImport

import { inject, InjectionToken } from '@angular/core';
import { LocaleProvider } from './types';
import { AngularLocaleProviderService } from './services/angular-locale-provider.service';
import { NavigatorLanguageLocaleProviderService } from './services/navigator-language-locale-provider.service';
import { StorageLocaleProviderService } from './services/storage-locale-provider.service';

/**
 * Injection token for the locale providers. See {@link LocaleService}.
 * @remarks The providers are provided in the root injector.
 * The default providers are:
 * - {@link AngularLocaleProviderService}
 * - {@link NavigatorLanguageLocaleProviderService}
 * - {@link StorageLocaleProviderService}
 *
 * The values are checked in the reverse order. The last provider to provide a value is used.
 * If a provider does not provide a value, the next provider is checked.
 *
 * So the default providers first use the stored locale. This allows users to override the locale set by browser settings.
 * If the stored locale is not set, the browser language is used.
 * If the browser language is missing, the Angular locale is used.
 */
export const LOCALE_PROVIDERS_TOKEN = new InjectionToken<LocaleProvider[]>(
	'locale-providers',
	{
		providedIn: 'root',
		factory: () => [
			inject(AngularLocaleProviderService),
			inject(NavigatorLanguageLocaleProviderService),
			inject(StorageLocaleProviderService),
		],
	}
);
