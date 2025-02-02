import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
// noinspection ES6PreferShortImport
import { LocalStorageThemeProviderService } from './local-storage-theme-provider.service';
import { THEME_STORAGE_KEY_TOKEN } from './constants';
import { THEMES } from './themes';

import type { Theme } from './types';

describe('ThemeStorageService', () => {
	let service: LocalStorageThemeProviderService;
	let mockDocument: Document;
	let mockLocalStorage: Storage;
	let mockAddEventListener: jasmine.Spy;
	let mockRemoveEventListener: jasmine.Spy;
	const themeKey = 'theme-key';

	beforeEach(() => {
		const listeners = [] as ((event: StorageEvent) => void)[];
		const storage = new Map<string, string>();
		mockLocalStorage = {
			getItem: jasmine
				.createSpy('getItem')
				.and.callFake(key => storage.get(key)),
			setItem: jasmine
				.createSpy('setItem')
				.and.callFake((key: string, value: string) => {
					storage.set(key, value);
					const evt: StorageEvent = new StorageEvent('storage', {
						key,
						newValue: value,
					});
					listeners.forEach(listener => listener(evt));
				}),
			removeItem: jasmine.createSpy('removeItem').and.callFake(key => {
				storage.delete(key);
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
				addEventListener: mockAddEventListener,
				removeEventListener: mockRemoveEventListener,
				dispatchEvent: jasmine.createSpy('dispatchEvent'),
			},
		} as unknown as Document;

		TestBed.configureTestingModule({
			providers: [
				{ provide: DOCUMENT, useValue: mockDocument },
				{ provide: THEME_STORAGE_KEY_TOKEN, useValue: themeKey },
			],
		});

		service = TestBed.inject(LocalStorageThemeProviderService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should remove the storage event listener on destroy', () => {
		service.ngOnDestroy();
		expect(mockRemoveEventListener).toHaveBeenCalledWith(
			'storage',
			jasmine.any(Function)
		);
	});

	it('should add a storage event listener', () => {
		expect(mockAddEventListener).toHaveBeenCalledWith(
			'storage',
			jasmine.any(Function)
		);
	});

	it('should return the current theme from local storage', () => {
		(mockLocalStorage.getItem as jasmine.Spy).and.returnValue(THEMES[0]);
		expect(service.theme).toBe(THEMES[0]);
	});

	it('should return null if the theme in local storage is invalid', () => {
		(mockLocalStorage.getItem as jasmine.Spy).and.returnValue(
			'invalid-theme'
		);
		expect(service.theme).toBeNull();
	});

	it('should set the theme in local storage', () => {
		service.theme = THEMES[1];
		expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
			themeKey,
			THEMES[1]
		);
	});

	it('should remove the theme from local storage if the value is null', () => {
		service.theme = null;
		expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(themeKey);
	});

	it('should remove the theme from local storage if the value is invalid', () => {
		service.theme = 'invalid-theme' as unknown as Theme;
		expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(themeKey);
	});

	it('should emit theme changes via theme$', () => {
		let emittedTheme: Theme | null = null;
		service.theme$.subscribe(theme => (emittedTheme = theme));
		service.theme = THEMES[1];
		expect(emittedTheme as Theme | null).toBe(THEMES[1]);
		service.theme = null;
		expect(emittedTheme).toBe(null);

		emittedTheme = 'light';

		service.theme = null; // it should not emit the same value
		expect(emittedTheme).toEqual('light');
	});
});
