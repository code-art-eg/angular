import { Observable } from 'rxjs';
import { THEMES } from './themes';

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
