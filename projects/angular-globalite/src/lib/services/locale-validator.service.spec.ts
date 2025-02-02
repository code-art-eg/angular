import { TestBed } from '@angular/core/testing';
import { LocaleValidatorService } from './locale-validator.service';
import { SUPPORTED_LOCALES_TOKEN } from '../constants';

describe('LocaleValidatorService', () => {
	let service: LocaleValidatorService;
	const supportedLocales = ['en-US', 'de-DE', 'ar-Arabic-EG'];

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: SUPPORTED_LOCALES_TOKEN,
					useValue: supportedLocales,
				},
			],
		});
		service = TestBed.inject(LocaleValidatorService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should throw an error if supportedLocales is empty', () => {
		expect(() => new LocaleValidatorService([])).toThrowError(
			'Parameter supportedLocales passed to LocaleValidatorService constructor cannot be empty.'
		);
	});

	it('should return the exact match for a supported locale', () => {
		expect(service.getSupportedLocale('en-US')).toBe('en-US');
	});

	it('should return the parent locale if the exact match is not found', () => {
		expect(service.getSupportedLocale('en')).toBe('en-US');
	});

	it('should return the a culture with the same parent locale if the exact match is not found', () => {
		expect(service.getSupportedLocale('en-GB')).toBe('en-US');
	});

	it('should return the parent locale if the given locale is a child', () => {
		expect(service.getSupportedLocale('ar-EG')).toBe('ar-Arabic-EG');
	});

	it('should return the null locale if no match is found', () => {
		expect(service.getSupportedLocale('fr-FR')).toBeNull();
	});

	it('should normalize the locale names', () => {
		expect(service.getSupportedLocale('EN-us')).toBe('en-US');
	});

	it('should return default locale', () => {
		expect(service.getDefaultLocale()).toBe('en-US');
	});

	it('should return the supported locales', () => {
		expect(service.getSupportedLocales()).toEqual([
			'en-US',
			'de-DE',
			'ar-Arabic-EG',
		]);
	});
});
