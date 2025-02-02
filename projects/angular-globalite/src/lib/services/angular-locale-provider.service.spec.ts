// noinspection ES6PreferShortImport

import { AngularLocaleProviderService } from './angular-locale-provider.service';
import { TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';

describe('AngularLocaleProviderService', () => {
	let service: AngularLocaleProviderService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [{ provide: LOCALE_ID, useValue: 'en-US' }],
		});
		service = TestBed.inject(AngularLocaleProviderService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should have canWrite as false', () => {
		expect(service.canWrite).toBe(false);
	});

	it('should have the correct locale', () => {
		expect(service.locale).toBe('en-US');
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
