import { Observable } from 'rxjs';

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
