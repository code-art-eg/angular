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

/**
 * Type representing a date without time.
 *
 */
export interface DateOnly {
	/**
	 * The year.
	 * @type {number}
	 */
	year: number;

	/**
	 * The month. 1-based. Unlike JavaScript Date object, which is 0-based.
	 * @type {number}
	 */
	month: number;

	/**
	 * The day of the month.
	 * @type {number}
	 */
	day: number;
}

/**
 * Interface representing a message collection.
 * A message collection is a set of messages in a specific language and context.
 */
export interface MessageCollection {
	/**
	 * The language of the messages.
	 */
	language: string;
	/**
	 * A map of message keys to message strings.
	 */
	messages: Record<string, string>;

	/**
	 * The context of the messages. Can be FORM_VALIDATION_CONTEXT, FORM_FIELD_CONTEXT, etc.
	 */
	context: string;
}

/**
 * Interface representing a message result from {@link MessageProvider.getMessage}.
 */
export interface MessageResult {
	/**
	 * The message key.
	 */
	readonly key: string;

	/**
	 * The message language.
	 * This is not necessarily the same as the requested language.
	 * The provider by fall back to a different language if the requested language is not supported.
	 */
	readonly language: string;

	/**
	 * The message string.
	 */
	readonly message: string;

	/**
	 * The message context.
	 */
	readonly context: string;

	/**
	 * Whether the message can be edited.
	 */
	readonly editable: boolean;

	/**
	 * The message provider. providing this message
	 */
	readonly provider: MessageProvider;
}

/**
 * Interface representing a message provider.
 */
export interface MessageProvider {
	/**
	 * Gets a message.
	 * @param language - The language of the message.
	 * @param context - The context of the message.
	 * @param key - The key of the message.
	 * @returns An observable that emits the message.
	 */
	getMessage(
		language: string,
		context: string,
		key: string
	): Observable<MessageResult | null>;

	/**
	 * Sets a message.
	 * @param language - The language of the message.
	 * @param context - The context of the message.
	 * @param key - The key of the message.
	 * @param message - The message string.
	 * @returns An observable that emits the message.
	 */
	setMessage(
		language: string,
		context: string,
		key: string,
		message: string
	): Observable<MessageResult>;

	/**
	 * Indicates whether the provider supports editing messages.
	 */
	readonly supportsEditing: boolean;
}
