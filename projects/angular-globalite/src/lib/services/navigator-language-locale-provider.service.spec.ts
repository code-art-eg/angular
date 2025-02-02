// noinspection ES6PreferShortImport
import { NavigatorLanguageLocaleProviderService } from './navigator-language-locale-provider.service';
import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';

describe('NavigatorLanguageLocaleProviderService', () => {
	let service: NavigatorLanguageLocaleProviderService;
	let mockDocument: Document;
	let mockWindow: Window;

	beforeEach(() => {
		mockWindow = {
			navigator: {
				language: 'en-US',
			},
		} as Window;

		mockDocument = {
			defaultView: mockWindow,
		} as Document;

		TestBed.configureTestingModule({
			providers: [{ provide: DOCUMENT, useValue: mockDocument }],
		});

		service = TestBed.inject(NavigatorLanguageLocaleProviderService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should have the correct locale', () => {
		expect(service.locale).toBe('en-US');
	});

	it('should have canWrite as false', () => {
		expect(service.canWrite).toBe(false);
	});

	it('should throw an error when setLocale is called', () => {
		expect(() => service.setLocale('fr-FR')).toThrowError(
			'Method not supported.'
		);
	});

	it('should emit the correct locale from locale$', done => {
		service.locale$.subscribe(locale => {
			expect(locale).toBe('en-US');
			done();
		});
	});
});
