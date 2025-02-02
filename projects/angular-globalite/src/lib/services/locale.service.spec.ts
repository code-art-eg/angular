import { TestBed } from '@angular/core/testing';
import { LocaleService } from './locale.service';
import { LocaleProvider } from '../types';
import { LocaleValidatorService } from './locale-validator.service';
import { BehaviorSubject, of } from 'rxjs';
import { LOCALE_PROVIDERS_TOKEN } from '../provider-tokens';

describe('LocaleService', () => {
	let supportedLocales: string[];
	let service: LocaleService;
	let mockLocaleValidator: LocaleValidatorService;
	let mockProviders: LocaleProvider[];

	beforeEach(() => {
		supportedLocales = ['en-GB', 'de-DE', 'ar-EG'];
		mockLocaleValidator = {
			getSupportedLocale(locale: string): string | null {
				return supportedLocales.includes(locale) ? locale : null;
			},
			getDefaultLocale(): string {
				return 'en-US';
			},
		} as LocaleValidatorService;

		const locale$ = new BehaviorSubject('de-DE');

		mockProviders = [
			{
				locale$: of('fr-FR'),
				locale: 'fr-FR',
				canWrite: false,
				setLocale: jasmine.createSpy('setLocale'),
			},
			{
				locale$: locale$,
				locale: 'de-DE',
				canWrite: true,
				setLocale: function (locale: string) {
					locale$.next(locale);
				},
			},
		];

		Object.defineProperty(mockProviders[1], 'locale', {
			get: () => locale$.value,
		});

		TestBed.configureTestingModule({
			providers: [
				{ provide: LOCALE_PROVIDERS_TOKEN, useValue: mockProviders },
				{
					provide: LocaleValidatorService,
					useValue: mockLocaleValidator,
				},
			],
		});

		service = TestBed.inject(LocaleService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should return the best locale from the providers', () => {
		expect(service.currentLocale).toBe('de-DE');
	});

	it('should set the locale to default when unsupported locale is set', () => {
		service.currentLocale = 'es-ES';
		service.locale$.subscribe(locale => {
			expect(locale).toBe('en-US');
		});
		expect(service.currentLocale).toBe('en-US');
	});
});
