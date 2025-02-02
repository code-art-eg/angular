import { GlobalizeNumberDirective } from './globalize-number.directive';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { LOCALE_PROVIDERS_TOKEN } from '../provider-tokens';
import { LocaleProvider } from '../types';
import { LocaleService } from '../services/locale.service';
import { SUPPORTED_LOCALES_TOKEN } from '../constants';

@Component({
	imports: [ReactiveFormsModule, GlobalizeNumberDirective],
	template: ` <input type="text" glbToNumber [formControl]="formControl" /> `,
})
class TestComponent {
	public readonly formControl: FormControl;

	constructor(formBuilder: FormBuilder) {
		this.formControl = formBuilder.control(1);
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

describe('GlobalizeNumberDirective', () => {
	let fixture: ComponentFixture<TestComponent>;
	let component: TestComponent;
	let directive: GlobalizeNumberDirective;
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
			.query(By.directive(GlobalizeNumberDirective))
			.injector.get(GlobalizeNumberDirective);
		input = fixture.debugElement.query(By.css('input'))
			.nativeElement as HTMLInputElement;
		localeService = TestBed.inject(LocaleService);
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});

	it('update reflect the value of the control on the input element', () => {
		expect(component.formControl.value).toBe(1);
		fixture.detectChanges();
		expect(input.value).toBe('1');
	});

	it('update the model value to null when input is an empty string', () => {
		fixture.detectChanges();
		input.value = '';
		input.dispatchEvent(new Event('input'));
		expect(component.formControl.value).toBeNull();
	});

	it('update the model value to value when input a number is entered', () => {
		fixture.detectChanges();
		input.value = '1,234,567.89';
		input.dispatchEvent(new Event('input'));
		expect(component.formControl.value).toBe(1234567.89);
	});

	it('update the model value to value when input a number is entered with more than default digits', () => {
		fixture.detectChanges();
		input.value = '1,234,567.89556';
		input.dispatchEvent(new Event('input'));
		expect(component.formControl.value).toBe(1234567.89556);
	});

	it('update the input when model value has more than default digits', () => {
		directive.format = 'n5';
		component.formControl.setValue(1234567.89556);
		fixture.detectChanges();
		expect(input.value).toBe('1,234,567.89556');
	});

	it('update the input when locale changes', () => {
		directive.format = 'n5';

		component.formControl.setValue(1234567.89556);
		fixture.detectChanges();
		localeService.currentLocale = 'de';
		expect(input.value).toBe('1.234.567,89556');
		localeService.currentLocale = 'ar-EG';
		expect(input.value).toBe('١٬٢٣٤٬٥٦٧٫٨٩٥٥٦');
	});

	it('parse the input value with ar locale', () => {
		directive.format = 'n5';
		localeService.currentLocale = 'ar-EG';
		component.formControl.setValue(1234567.89556);
		fixture.detectChanges();
		input.value = '١٬٢٣٤٬٥٦٧٫٨٩٥٥٦';
		input.dispatchEvent(new Event('input'));
		expect(component.formControl.value).toBe(1234567.89556);
	});

	it('updates disabled state', () => {
		component.formControl.disable();
		fixture.detectChanges();
		expect(input.disabled).toBe(true);
		component.formControl.enable();
		fixture.detectChanges();
		expect(input.disabled).toBe(false);
	});

	it('raises touch events', () => {
		fixture.detectChanges();
		expect(component.formControl.touched).toBe(false);
		input.dispatchEvent(new Event('blur'));
		expect(component.formControl.touched).toBe(true);
	});
});
