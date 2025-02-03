// noinspection ES6PreferShortImport

import type { CookieLocaleConfig, StorageLocaleConfig } from './types';
import { InjectionToken } from '@angular/core';

const CONFIG_PREFIX = 'angular-globalite';

/**
 * default key for the locale storage key. See {@link StorageLocaleProviderService}.
 */
export const DEFAULT_APP_LOCALE_KEY = CONFIG_PREFIX + '.locale';
/**
 * default cookie name for the locale cookie. See {@link CookieLocaleProviderService}.
 */
export const DEFAULT_COOKIE_NAME = CONFIG_PREFIX + '.locale';

/**
 * default cookie expiration in minutes. See {@link CookieLocaleProviderService}.
 */
export const DEFAULT_COOKIE_EXPIRES_MINUTES = 365 * 24 * 60;

/**
 * default cookie path. See {@link CookieLocaleProviderService}.
 */
export const DEFAULT_COOKIE_PATH = '/';

/**
 * Injection token for the locale storage key.
 */
export const STORAGE_LOCALE_CONFIG_TOKEN =
	new InjectionToken<StorageLocaleConfig>('locale-storage-key', {
		providedIn: 'root',
		factory: () => ({
			key: DEFAULT_APP_LOCALE_KEY,
			useSessionStorage: false,
		}),
	});

/**
 * Injection token for the cookie locale configuration.
 */
export const COOKIE_LOCALE_CONFIG_TOKEN =
	new InjectionToken<CookieLocaleConfig>('locale-cookie-config', {
		providedIn: 'root',
		factory: () => ({
			cookieName: DEFAULT_COOKIE_NAME,
			cookieExpiresMinutes: DEFAULT_COOKIE_EXPIRES_MINUTES,
			cookiePath: DEFAULT_COOKIE_PATH,
		}),
	});

/**
 * The default locale. English (United States).
 */
export const DEFAULT_LOCALE = 'en-US';

/**
 * Injection token for the supported locales. See {@link LocaleValidatorService}.
 */
export const SUPPORTED_LOCALES_TOKEN = new InjectionToken<string[]>(
	'supported-locales',
	{ providedIn: 'root', factory: () => [DEFAULT_LOCALE] }
);
