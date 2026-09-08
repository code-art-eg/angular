import { inject, Injectable } from '@angular/core';
import { COOKIE_LOCALE_CONFIG_TOKEN } from '../constants';
import { CookieLocaleConfig, LocaleProvider } from '../types';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { createCookie } from '../util/create-cookie';
import { readCookie } from '../util/read-cookie';

/**
 * Service to manage locale storage in cookies.
 */
@Injectable({
	providedIn: 'root',
})
export class CookieLocaleProviderService implements LocaleProvider {
	private readonly config: CookieLocaleConfig = inject(
		COOKIE_LOCALE_CONFIG_TOKEN
	);
	private readonly document: Document = inject(DOCUMENT);

	/**
	 * @inheritdoc
	 */
	readonly canWrite = true;
	readonly #locale$: BehaviorSubject<string | null> = new BehaviorSubject<
		string | null
	>(this.locale);
	/**
	 * @inheritdoc
	 */
	readonly locale$: Observable<string | null> = this.#locale$.asObservable();

	/**
	 * @inheritdoc
	 */
	setLocale(locale: string | null): void {
		createCookie(
			this.document,
			this.config.cookieName,
			locale,
			this.config.cookieExpiresMinutes,
			this.config.cookiePath
		);
		this.#locale$.next(locale);
	}

	/**
	 * @inheritdoc
	 */
	get locale(): string | null {
		return readCookie(this.document, this.config.cookieName);
	}
}
