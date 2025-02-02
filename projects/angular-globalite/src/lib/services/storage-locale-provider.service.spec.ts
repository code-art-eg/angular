// noinspection ES6PreferShortImport
import { StorageLocaleProviderService } from './storage-locale-provider.service';
import { StorageLocaleConfig } from '../types';
import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { STORAGE_LOCALE_CONFIG_TOKEN } from '../constants';

describe('StorageLocaleProviderService', () => {
	let service: StorageLocaleProviderService;
	let mockDocument: Document;
	let mockLocalStorage: Storage;
	let mockSessionStorage: Storage;
	let mockAddEventListener: jasmine.Spy;
	let mockRemoveEventListener: jasmine.Spy;

	const testKey = 'test-local-storage-key';

	const config: StorageLocaleConfig = {
		key: testKey,
		useSessionStorage: false,
	};

	beforeEach(() => {
		const listeners = [] as ((event: StorageEvent) => void)[];

		const localStorage = new Map<string, string>();
		const sessionStorage = new Map<string, string>();

		mockLocalStorage = {
			getItem: jasmine
				.createSpy('getItem')
				.and.callFake(key => localStorage.get(key)),
			setItem: jasmine
				.createSpy('setItem')
				.and.callFake((key: string, value: string) => {
					localStorage.set(key, value);
					const evt: StorageEvent = new StorageEvent('storage', {
						key,
						newValue: value,
					});
					listeners.forEach(listener => listener(evt));
				}),
			removeItem: jasmine.createSpy('removeItem').and.callFake(key => {
				localStorage.delete(key);
				const evt: StorageEvent = new StorageEvent('storage', {
					key,
					newValue: null,
				});
				listeners.forEach(listener => listener(evt));
			}),
			length: 0,
			clear: jasmine.createSpy('clear'),
			key: jasmine.createSpy('key'),
		};

		mockSessionStorage = {
			getItem: jasmine
				.createSpy('getItem')
				.and.callFake(key => localStorage.get(key)),
			setItem: jasmine
				.createSpy('setItem')
				.and.callFake((key: string, value: string) => {
					sessionStorage.set(key, value);
					const evt: StorageEvent = new StorageEvent('storage', {
						key,
						newValue: value,
					});
					listeners.forEach(listener => listener(evt));
				}),
			removeItem: jasmine.createSpy('removeItem').and.callFake(key => {
				sessionStorage.delete(key);
				const evt: StorageEvent = new StorageEvent('storage', {
					key,
					newValue: null,
				});
				listeners.forEach(listener => listener(evt));
			}),
			length: 0,
			clear: jasmine.createSpy('clear'),
			key: jasmine.createSpy('key'),
		};

		mockAddEventListener = jasmine
			.createSpy('addEventListener')
			.and.callFake((type: string, listener: (evt: Event) => void) => {
				if (type !== 'storage') {
					return;
				}
				return listeners.push(listener);
			});
		mockRemoveEventListener = jasmine
			.createSpy('removeEventListener')
			.and.callFake((type: string, listener: (evt: Event) => void) => {
				if (type !== 'storage') {
					return;
				}
				const index = listeners.indexOf(listener);
				if (index >= 0) {
					listeners.splice(index, 1);
				}
			});

		mockDocument = {
			defaultView: {
				localStorage: mockLocalStorage,
				sessionStorage: mockSessionStorage,
				addEventListener: mockAddEventListener,
				removeEventListener: mockRemoveEventListener,
				dispatchEvent: jasmine.createSpy('dispatchEvent'),
			},
		} as unknown as Document;

		TestBed.configureTestingModule({
			providers: [
				{ provide: DOCUMENT, useValue: mockDocument },
				{ provide: STORAGE_LOCALE_CONFIG_TOKEN, useValue: config },
			],
		});

		service = TestBed.inject(StorageLocaleProviderService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should initialize locale$ with the value from storage', () => {
		service.locale$.subscribe(locale => {
			expect(locale).toBe(null);
		});
	});

	it('should set locale in storage and update locale$', () => {
		service.setLocale('fr-FR');
		expect(mockLocalStorage.setItem).toHaveBeenCalledWith(testKey, 'fr-FR');
		service.locale$.subscribe(locale => {
			expect(locale).toBe('fr-FR');
		});
	});

	it('should remove locale from storage and update locale$', () => {
		service.setLocale(null);
		expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(testKey);
		service.locale$.subscribe(locale => {
			expect(locale).toBeNull();
		});
	});

	it('should handle storage event and update locale$', () => {
		mockLocalStorage.setItem(testKey, 'es-ES');
		service.locale$.subscribe(locale => {
			expect(locale).toBe('es-ES');
		});
	});

	it('should not update locale$ if storage event key does not match', () => {
		mockLocalStorage.setItem(testKey + '_', 'es-ES');
		service.locale$.subscribe(locale => {
			expect(locale).toBeNull();
		});
	});

	it('uses session storage if configured', () => {
		service = new StorageLocaleProviderService(mockDocument, {
			key: testKey,
			useSessionStorage: true,
		});

		service.setLocale('fr-FR');
		expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
			testKey,
			'fr-FR'
		);
	});
});
