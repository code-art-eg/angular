// noinspection ES6PreferShortImport
import { GlobalizeDirectionDirective } from './globalize-direction.directive';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { LOCALE_PROVIDERS_TOKEN } from '../provider-tokens';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LocaleProvider } from '../types';
import { LocaleService } from '../services/locale.service';
import { SUPPORTED_LOCALES_TOKEN } from '../constants';

@Component({
	imports: [ReactiveFormsModule, GlobalizeDirectionDirective],
	template: ` <div glbDirection rtlCssClass="r" ltrCssClass="l"></div> `,
})
class TestComponent {}

class MockLocaleProvider implements LocaleProvider {
	canWrite = true;
	locale: string | null = null;
	setLocale(locale: string | null): void {
		if (this.locale !== locale) {
			this.locale = locale;
			(this.locale$ as BehaviorSubject<string | null>).next(locale);
		}
	}
	locale$: Observable<string | null> = new BehaviorSubject(null);
}

describe('GlobalizeDirectionDirective', () => {
	let fixture: ComponentFixture<TestComponent>;
	let div: HTMLDivElement;
	let localeService: LocaleService;
	let directive: GlobalizeDirectionDirective;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: SUPPORTED_LOCALES_TOKEN,
					useValue: ['en', 'ar'],
				},
				{
					provide: LOCALE_PROVIDERS_TOKEN,
					useValue: [new MockLocaleProvider()],
				},
			],
		});

		fixture = TestBed.createComponent(TestComponent);
		fixture.detectChanges();

		div = fixture.debugElement.query(By.css('div')).nativeElement;
		localeService = TestBed.inject(LocaleService);

		directive = fixture.debugElement
			.query(By.directive(GlobalizeDirectionDirective))
			.injector.get(GlobalizeDirectionDirective);
	});

	it('should default to ltr', () => {
		expect(div.dir).toBe('ltr');
		expect(div.classList.contains('l')).toBe(true);
		expect(div.classList.contains('r')).toBe(false);
	});

	it('should change direction when locale service changes', () => {
		localeService.currentLocale = 'ar';
		expect(div.dir).toBe('rtl');
		expect(div.classList.contains('r')).toBe(true);
		expect(div.classList.contains('l')).toBe(false);

		localeService.currentLocale = 'en';

		expect(div.dir).toBe('ltr');
		expect(div.classList.contains('l')).toBe(true);
		expect(div.classList.contains('r')).toBe(false);
	});

	it('should override default when locale property is set', () => {
		directive.locale = 'ar';
		expect(div.dir).toBe('rtl');
		expect(div.classList.contains('r')).toBe(true);
		expect(div.classList.contains('l')).toBe(false);
	});

	it('should change css class and ltrCssClass changes', () => {
		directive.ltrCssClass = 'l2';
		expect(div.classList.contains('l')).toBe(false);
		expect(div.classList.contains('l2')).toBe(true);
	});

	it('should change css class and rtlCssClass changes', () => {
		directive.locale = 'ar';
		directive.rtlCssClass = 'r2';
		expect(div.classList.contains('r')).toBe(false);
		expect(div.classList.contains('r2')).toBe(true);
	});
});
