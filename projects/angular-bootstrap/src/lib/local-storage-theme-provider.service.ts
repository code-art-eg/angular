import { inject, Injectable, OnDestroy } from '@angular/core';
import { THEME_STORAGE_KEY_TOKEN } from './constants';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import type { ThemeProvider, Theme } from './types';
import { THEMES } from './themes';

/**
 * Service to manage theme storage in local storage.
 * Implements the ThemeProvider interface and OnDestroy lifecycle hook.
 */
@Injectable({
	providedIn: 'root',
})
export class LocalStorageThemeProviderService
	implements ThemeProvider, OnDestroy
{
	readonly #document = inject(DOCUMENT);
	readonly #key = inject(THEME_STORAGE_KEY_TOKEN);
	readonly #storageListener = this.#onStorageChange.bind(this);
	readonly #theme$ = new BehaviorSubject<Theme | null>(this.theme);
	readonly theme$ = this.#theme$.asObservable();

	/**
	 * Constructor to initialize the service and add storage event listener.
	 */
	constructor() {
		if (this.#window) {
			this.#window.addEventListener('storage', this.#storageListener);
		}
	}

	/**
	 * Gets the window object from the document.
	 * @private
	 * @returns {Window | null} The window object or null if not available.
	 */
	get #window(): Window | null {
		return this.#document?.defaultView ?? null;
	}

	/**
	 * Gets the local storage object from the window.
	 * @private
	 * @returns {Storage | null} The local storage object or null if not available.
	 */
	get #localStorage(): Storage | null {
		return this.#window?.localStorage ?? null;
	}

	/**
	 * Gets the current theme from local storage.
	 * @returns {Theme | null} The current theme or null if not set or invalid.
	 */
	get theme(): Theme | null {
		if (!this.#localStorage) {
			return null;
		}
		const current = this.#localStorage.getItem(this.#key) as Theme | null;
		if (!current || !THEMES.includes(current)) {
			return null;
		}
		return current;
	}

	/**
	 * Sets the theme in local storage.
	 * @param {Theme | null} value - The theme to set or null to remove the theme.
	 */
	set theme(value: Theme | null) {
		if (!this.#localStorage) {
			return;
		}

		if (!value || !THEMES.includes(value)) {
			this.#localStorage.removeItem(this.#key);
			value = null;
		} else {
			this.#localStorage.setItem(this.#key, value);
		}
		this.#window!.dispatchEvent(
			new StorageEvent('storage', { key: this.#key, newValue: value })
		);
	}

	/**
	 * Handles the storage event to update the theme.
	 * @private
	 * @param {StorageEvent} event - The storage event.
	 */
	#onStorageChange(event: StorageEvent) {
		if (event.key === this.#key) {
			const theme = event.newValue as Theme | null;
			if (
				theme !== this.#theme$.value &&
				(!theme || THEMES.includes(theme))
			) {
				this.#theme$.next(theme);
			}
		}
	}

	/**
	 * Lifecycle hook to remove the storage event listener on destroy.
	 */
	ngOnDestroy(): void {
		if (this.#window) {
			this.#window.removeEventListener('storage', this.#storageListener);
		}
	}
}
