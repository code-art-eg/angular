import { Observable } from 'rxjs';

/**
 * Interface representing a locale provider.
 */
export interface LocaleProvider {
	/**
	 * Indicates whether the provider supports writing.
	 */
	readonly canWrite: boolean;

	/**
	 * The current locale.
	 */
	readonly locale: string | null;

	/**
	 * Sets the current locale.
	 *
	 * @param {string | null} locale - The locale to set.
	 */
	setLocale(locale: string | null): void;

	/**
	 * Observable that emits the current locale.
	 */
	readonly locale$: Observable<string | null>;
}

/**
 * Interface representing the configuration for storage locale.
 */
export interface StorageLocaleConfig {
	/**
	 * The key used to store the locale.
	 */
	readonly key: string;

	/**
	 * Indicates whether to use session storage.
	 */
	readonly useSessionStorage: boolean;
}

/**
 * Interface representing the configuration for cookie locale.
 */
export interface CookieLocaleConfig {
	/**
	 * The name of the cookie.
	 */
	readonly cookieName: string;

	/**
	 * The expiration time of the cookie in minutes.
	 */
	readonly cookieExpiresMinutes: number;

	/**
	 * The path of the cookie.
	 */
	readonly cookiePath: string;
}

/**
 * Type representing the display format for months.
 */
export type MonthDisplay =
	| 'narrow'
	| 'short'
	| 'long'
	| 'narrow-islamic'
	| 'short-islamic'
	| 'long-islamic';

/**
 * Type representing the display format for weekdays.
 */
export type WeekdayDisplay = 'narrow' | 'short' | 'long';

export type ControlValue<T> = T | null | string;
export type OnChangeHandler<T> = (val: ControlValue<T>) => void;
export type CoercedValue<T> = T | null | undefined;
