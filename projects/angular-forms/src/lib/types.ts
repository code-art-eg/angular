import { Observable } from 'rxjs';
import { DefaultExport } from '@angular/router';
import { TemplateRef, Type } from '@angular/core';

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

/**
 * Button type for a DialogButton.
 */
export type ButtonType =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'danger'
	| 'warning'
	| 'info';

/**
 * Dialog button data.
 */
export interface DialogButton {
	/*
	 * The id of the button. This is used to identify the button which button was clicked.
	 */
	id: string;
	/**
	 * The text of the button.
	 */
	text: string;
	/**
	 * The type of the button. This is used to style the button.
	 * @type {ButtonType}
	 */
	buttonType: ButtonType;
	/**
	 * Indicates whether clicking the button causes the dialog to be dismissed/closed.
	 */
	close: boolean;
}

/**
 * Message box data.
 */
export interface MessageBoxData {
	/**
	 * The title of the message box.
	 */
	title: string;
	/**
	 * The message of the message box.
	 */
	message: string;
	/**
	 * The buttons of the message box.
	 */
	buttons?: DialogButton[];
	/**
	 * The icon of the message box. This is displayed in the message box.
	 */
	icon?: string;
	/**
	 * The icon color of the message box. This is displayed in the message box.
	 */
	iconColor?: string;
}

/**
 * A popup component that can be opened with a data input and emits a result.
 */
export interface IPopupComponent<TInput, TResult> {
	/**
	 * Sets the data input for the popup.
	 * @param data
	 */
	setData: (data: TInput) => void;
	/**
	 * Observable that emits the result of the popup.
	 */
	output: Observable<TResult>;

	/**
	 * The header template of the popup.
	 */
	headerTemplate?: TemplateRef<unknown> | null;

	/**
	 * The footer template of the popup.
	 */
	footerTemplate?: TemplateRef<unknown> | null;
}

/**
 * Represents a component's type
 */
export type ComponentType<T> =
	| Type<T>
	| Promise<Type<T> | DefaultExport<Type<T>>>
	| Observable<Type<T> | DefaultExport<Type<T>>>;

/**
 * Represents a popup component's type
 */
export type PopupComponentType<TInput, TResult> = ComponentType<
	IPopupComponent<TInput, TResult>
>;

/**
 * Represents a dialog or popup type
 * Dialog is a modal that requires a result to close
 * Popup is a modal that can be closed without a result
 */
export type PopupType = 'Dialog' | 'Popup';

/**
 * Represents the options for a dialog or popup
 */
export interface PopupOptions<TInput, TResult> {
	/**
	 * The component to load.
	 */
	component?: PopupComponentType<TInput, TResult>;
	/**
	 * A function to lazy load the component.
	 */
	loadComponent?: () => PopupComponentType<TInput, TResult>;
}
