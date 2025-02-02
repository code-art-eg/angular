import { inject, Injectable, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { THEME_PROVIDER_TOKEN } from './constants';
import { THEMES } from './themes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
const APP_THEME_ATTR = 'data-bs-theme';

/**
 * ThemeService is a service that manages the application theme.
 * It listens to theme changes and applies the appropriate theme to the document body.
 */
@Injectable({
	providedIn: 'root',
})
export class ThemeService implements OnDestroy {
	/**
	 * The document object.
	 * @private
	 */
	readonly #document = inject(DOCUMENT);
	/**
	 * The media query matcher for detecting theme preference.
	 * @private
	 */
	#matcher: MediaQueryList | null = null;

	/**
	 * The theme provider used to get the current theme.
	 * @private
	 */
	readonly #themeProvider = inject(THEME_PROVIDER_TOKEN);

	/**
	 * The event listener for media query changes.
	 * @private
	 */
	readonly #listener: (e: MediaQueryListEvent) => void;

	/**
	 * Constructor to initialize the service and subscribe to theme changes.
	 */
	constructor() {
		this.#listener = this.#themeListener.bind(this);
		this.#themeProvider.theme$
			.pipe(takeUntilDestroyed())
			.subscribe(() => this.#applyTheme());
	}

	/**
	 * Lifecycle hook to clean up the media query event listener on destroy.
	 */
	ngOnDestroy(): void {
		if (this.#matcher) {
			this.#matcher.removeEventListener('change', this.#listener);
			this.#matcher = null;
		}
	}

	/**
	 * Applies the current theme to the document body.
	 * @private
	 */
	#applyTheme(): void {
		if (!this.#document) {
			return;
		}
		let theme = this.#themeProvider.theme;
		if (!theme) {
			if (!this.#matcher) {
				this.#matcher = this.#document.defaultView!.matchMedia(
					`(prefers-color-scheme: ${THEMES[1]})`
				);
				this.#matcher.addEventListener('change', this.#listener);
			}
			theme = this.#matcher.matches ? THEMES[1] : THEMES[0];
		} else if (this.#matcher) {
			this.#matcher.removeEventListener('change', this.#listener);
			this.#matcher = null;
		}
		this.#document.body.setAttribute(APP_THEME_ATTR, theme);
	}

	/**
	 * Event listener for media query changes to re-apply the theme.
	 * @private
	 */
	#themeListener(): void {
		this.#applyTheme();
	}
}
