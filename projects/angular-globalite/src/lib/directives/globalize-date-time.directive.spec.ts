import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
// noinspection ES6PreferShortImport
import { GlobalizeDateTimeDirective } from './globalize-date-time.directive';
import { LOCALE_PROVIDERS_TOKEN } from '../provider-tokens';
import { LocaleProvider } from '../types';
import { LocaleService } from '../services/locale.service';
import { SUPPORTED_LOCALES_TOKEN } from '../constants';

const date1 = new Date(2008, 4, 31, 5, 42);

@Component({
	imports: [ReactiveFormsModule, GlobalizeDateTimeDirective],
	template: `
		<input type="text" glbToDateTime [formControl]="formControl" />
	`,
})
class TestComponent {
	public readonly formControl: FormControl;

	constructor(formBuilder: FormBuilder) {
		this.formControl = formBuilder.control(date1);
	}
}

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

describe('GlobalizeDateTimeDirective', () => {
	let fixture: ComponentFixture<TestComponent>;
	let component: TestComponent;
	let directive: GlobalizeDateTimeDirective;
	let localeService: LocaleService;
	let input: HTMLInputElement;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: SUPPORTED_LOCALES_TOKEN,
					useValue: ['en-GB', 'ar-EG', 'de'],
				},
				{
					provide: LOCALE_PROVIDERS_TOKEN,
					useValue: [new MockLocaleProvider()],
				},
			],
		});

		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		directive = fixture.debugElement
			.query(By.directive(GlobalizeDateTimeDirective))
			.injector.get(GlobalizeDateTimeDirective);
		input = fixture.debugElement.query(By.css('input'))
			.nativeElement as HTMLInputElement;
		localeService = TestBed.inject(LocaleService);
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});

	it('update reflect the value of the control on the input element', () => {
		expect(component.formControl.value).toBe(date1);
		fixture.detectChanges();
		expect(input.value).toBe('31/05/2008, 05:42');
	});

	it('update the model value to null when input is an empty string', () => {
		fixture.detectChanges();
		input.value = '';
		input.dispatchEvent(new Event('input'));
		expect(component.formControl.value).toBeNull();
	});

	it('update the model value to value when input a date is entered', () => {
		fixture.detectChanges();
		input.value = '21/03/2021, 15:21';
		input.dispatchEvent(new Event('input'));
		expect(component.formControl.value).toEqual(
			new Date(2021, 2, 21, 15, 21)
		);
	});

	it('update the input when locale changes', () => {
		directive.format = 'G';

		component.formControl.setValue(new Date(2021, 2, 21, 15, 21));
		fixture.detectChanges();
		localeService.currentLocale = 'de';
		expect(input.value).toBe('21.03.2021, 15:21:00');
		localeService.currentLocale = 'ar-EG';
		expect(input.value).toBe('٢١‏/٣‏/٢٠٢١ ٣:٢١:٠٠ م');
	});

	it('parse the date input value with ar locale', () => {
		directive.format = 'G';
		localeService.currentLocale = 'ar-EG';
		component.formControl.setValue(1234567.89556);
		fixture.detectChanges();
		input.value = '٢١/٣/٢٠٢١ ٣:٢١:٠٠ م';
		input.dispatchEvent(new Event('input'));
		expect(component.formControl.value).toEqual(
			new Date(2021, 2, 21, 15, 21)
		);
	});
});
