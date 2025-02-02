import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ThemeService } from './theme.service';
import { THEME_PROVIDER_TOKEN } from './constants';
import { Theme } from './types';
import { THEMES } from './themes';

class MockMatcher {
	readonly listeners: ((e: MediaQueryListEvent) => void)[] = [];
	readonly matchedTheme: string | null = null;
	readonly subscription: Subscription;

	constructor(
		query: string,
		readonly userTheme: BehaviorSubject<Theme>
	) {
		const rx = /\(prefers-color-scheme: (\w+)\)/;
		const match = query.match(rx);
		this.matchedTheme = match ? match[1] : null;
		this.subscription = userTheme.subscribe(() => {
			this.listeners.forEach(listener =>
				listener({} as MediaQueryListEvent)
			);
		});
	}

	// noinspection JSUnusedGlobalSymbols
	get matches(): boolean {
		return this.userTheme.value === this.matchedTheme;
	}

	// noinspection JSUnusedGlobalSymbols
	addEventListener(
		type: string,
		listener: (e: MediaQueryListEvent) => void
	): void {
		if (type !== 'change') {
			return;
		}
		this.listeners.push(listener);
	}

	// noinspection JSUnusedGlobalSymbols
	removeEventListener(
		type: string,
		listener: (e: MediaQueryListEvent) => void
	): void {
		if (type !== 'change') {
			return;
		}
		const index = this.listeners.indexOf(listener);
		if (index >= 0) {
			this.listeners.splice(index, 1);
		}
	}

	// noinspection JSUnusedGlobalSymbols
	destroy(): void {
		this.subscription.unsubscribe();
	}
}

describe('ThemeService', () => {
	let service: ThemeService;
	let mockDocument: Document;
	let mockThemeProvider: {
		theme$: BehaviorSubject<string | null>;
		theme: string | null;
	};
	let userTheme$: BehaviorSubject<Theme>;
	const APP_THEME_ATTR = 'data-bs-theme';

	function matchMedia(query: string): MediaQueryList {
		return new MockMatcher(query, userTheme$) as unknown as MediaQueryList;
	}

	beforeEach(() => {
		userTheme$ = new BehaviorSubject<Theme>(THEMES[0]);
		mockDocument = {
			body: {
				setAttribute: jasmine.createSpy('setAttribute'),
			},
			defaultView: {
				matchMedia: jasmine
					.createSpy('matchMedia')
					.and.callFake(matchMedia),
			},
		} as unknown as Document;

		mockThemeProvider = {
			theme$: new BehaviorSubject<string | null>(null),
			theme: null,
		};

		TestBed.configureTestingModule({
			providers: [
				ThemeService,
				{ provide: DOCUMENT, useValue: mockDocument },
				{ provide: THEME_PROVIDER_TOKEN, useValue: mockThemeProvider },
			],
		});

		service = TestBed.inject(ThemeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should apply the default theme on startup', () => {
		expect(mockDocument.body.setAttribute).toHaveBeenCalledWith(
			APP_THEME_ATTR,
			THEMES[0]
		);
	});

	it('should apply the dark theme if the media query matches', () => {
		expect(mockDocument.body.setAttribute).toHaveBeenCalledWith(
			APP_THEME_ATTR,
			THEMES[0]
		);

		userTheme$.next(THEMES[1]);
		expect(mockDocument.body.setAttribute).toHaveBeenCalledWith(
			APP_THEME_ATTR,
			THEMES[1]
		);
	});

	it('should apply the provided theme if set manually', () => {
		expect(mockDocument.body.setAttribute).toHaveBeenCalledWith(
			APP_THEME_ATTR,
			THEMES[0]
		);
		mockThemeProvider.theme = THEMES[1];
		mockThemeProvider.theme$.next(THEMES[1]);
		expect(mockDocument.body.setAttribute).toHaveBeenCalledWith(
			APP_THEME_ATTR,
			THEMES[1]
		);
	});
});
