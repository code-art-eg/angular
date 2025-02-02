import { Observable } from 'rxjs';
import { THEMES } from './themes';
import { TemplateRef, Type } from '@angular/core';
import { DefaultExport } from '@angular/router';

/**
 * Theme type. Either 'light' or 'dark'.
 */
export type Theme = (typeof THEMES)[number];

/**
 * Interface for theme providers.
 * A theme provider stores and provides the current theme.
 * And it emits an observable for theme changes.
 */
export interface ThemeProvider {
	/**
	 * The current theme. Null is for Auto (based on system preference).
	 */
	theme: Theme | null;

	/**
	 * Observable for theme changes.
	 */
	readonly theme$: Observable<Theme | null>;
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
 * Picker option for use by {@link PickerComponent}.
 */
export interface PickerOption {
	/**
	 * The value of the option.
	 * This value is used to set the current value of the picker.
	 * It can be any type.
	 * @type {unknown}
	 */
	readonly value: unknown;
	/**
	 * The label of the option. This is displayed in the picker.
	 */
	readonly label: string;

	/**
	 * The icon of the option. This is displayed in the picker.
	 * Using Bootstrap icons package.
	 *
	 * @see https://icons.getbootstrap.com/
	 * @type {string}
	 *
	 * @example
	 * 'sun-fill' - Sun icon
	 * 'moon-stars-fill' - Moon and stars icon
	 */
	readonly icon?: string;
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
