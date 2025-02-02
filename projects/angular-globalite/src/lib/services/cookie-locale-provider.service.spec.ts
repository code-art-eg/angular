// noinspection ES6PreferShortImport
import { CookieLocaleProviderService } from './cookie-locale-provider.service';
import { TestBed } from '@angular/core/testing';
import { COOKIE_LOCALE_CONFIG_TOKEN } from '../constants';
import { DOCUMENT } from '@angular/common';
import { CookieLocaleConfig } from '../types';

describe('CookieLocaleProviderService', () => {
	let service: CookieLocaleProviderService;
	let mockDocument: Document;
	let mockConfig: CookieLocaleConfig;

	beforeEach(() => {
		mockDocument = {
			cookie: '',
		} as Document;

		mockConfig = {
			cookieName: 'locale',
			cookieExpiresMinutes: 60,
			cookiePath: '/',
		};

		TestBed.configureTestingModule({
			providers: [
				{ provide: DOCUMENT, useValue: mockDocument },
				{ provide: COOKIE_LOCALE_CONFIG_TOKEN, useValue: mockConfig },
			],
		});

		service = TestBed.inject(CookieLocaleProviderService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should have canWrite as true', () => {
		expect(service.canWrite).toBe(true);
	});

	it('should return null if no locale is set', () => {
		expect(service.locale).toBeNull();
	});

	it('should set and get the locale correctly', () => {
		service.setLocale('en-US');
		expect(service.locale).toBe('en-US');
	});

	it('should emit the correct locale from locale$', done => {
		service.setLocale('en-US');
		service.locale$.subscribe(locale => {
			expect(locale).toBe('en-US');
			done();
		});
	});

	it('should call createCookie when setLocale is called', () => {
		service.setLocale('en-US');
		const date = new Date();
		date.setMinutes(date.getMinutes() + mockConfig.cookieExpiresMinutes);
		expect(mockDocument.cookie).toBe(
			`locale=en-US; expires=${date.toUTCString()}; path=/`
		);
	});

	it('should call readCookie when getting locale', () => {
		mockDocument.cookie =
			'locale=en-US; expires=${date.toUTCString()}; path=/';
		expect(service.locale).toBe('en-US');
	});
});
