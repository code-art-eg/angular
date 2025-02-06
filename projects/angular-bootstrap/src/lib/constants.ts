import { inject, InjectionToken } from '@angular/core';
import { LocalStorageThemeProviderService } from './local-storage-theme-provider.service';
import type { Theme, ThemeProvider } from './types';

const CONFIG_PREFIX = 'angular-bootstrap';

/**
 * Default key for the theme storage key. See {@link LocalStorageThemeProviderService}.
 */
export const DEFAULT_APP_THEME_KEY = CONFIG_PREFIX + '.theme';

/**
 * Default theme for the application. Used when no theme is set and auto cannot be determined.
 */
export const DEFAULT_APP_THEME: Theme = 'light';

/**
 * Injection token for the theme storage key.
 */
export const THEME_STORAGE_KEY_TOKEN = new InjectionToken<string>(
	'theme-storage-key',
	{ providedIn: 'root', factory: () => DEFAULT_APP_THEME_KEY }
);

/**
 * Injection token for the default theme.
 */
export const DEFAULT_THEME_TOKEN = new InjectionToken<Theme>('default-theme', {
	providedIn: 'root',
	factory: () => DEFAULT_APP_THEME,
});

/**
 * Injection token for the theme provider.
 */
export const THEME_PROVIDER_TOKEN = new InjectionToken<ThemeProvider>(
	'theme-provider',
	{
		providedIn: 'root',
		factory: () => inject(LocalStorageThemeProviderService),
	}
);
