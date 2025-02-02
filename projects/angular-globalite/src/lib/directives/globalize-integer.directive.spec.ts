import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalizeIntegerDirective } from './globalize-integer.directive';
import { LOCALE_PROVIDERS_TOKEN } from '../provider-tokens';
import { LocaleProvider } from '../types';
import { LocaleService } from '../services/locale.service';
import { SUPPORTED_LOCALES_TOKEN } from '../constants';

@Component({
	imports: [ReactiveFormsModule, GlobalizeIntegerDirective],
	template: `
		<input type="text" glbToInteger [formControl]="formControl" />
	`,
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

describe('GlobalizeIntegerDirective', () => {
	let component: TestComponent;
	let localeService: LocaleService;
	let input: HTMLInputElement;
	let fixture: ComponentFixture<TestComponent>;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: LOCALE_PROVIDERS_TOKEN,
					useValue: [new MockLocaleProvider()],
				},
				{
					provide: SUPPORTED_LOCALES_TOKEN,
					useValue: ['en-GB', 'ar-EG', 'de'],
				},
			],
		});

		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		input = fixture.debugElement.query(By.css('input'))
			.nativeElement as HTMLInputElement;
		localeService = TestBed.inject(LocaleService);
	});

	it('update reflect the integer value of the control on the input element', () => {
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

	it('update the model value to value when input an integer is entered', () => {
		fixture.detectChanges();
		input.value = '1234567';
		input.dispatchEvent(new Event('input'));
		expect(component.formControl.value).toBe(1234567);
	});

	it('update the input when locale changes', () => {
		component.formControl.setValue(123456);
		fixture.detectChanges();
		localeService.currentLocale = 'de';
		expect(input.value).toBe('123456');
		localeService.currentLocale = 'ar-EG';
		expect(input.value).toBe('١٢٣٤٥٦');
	});

	it('parse the input value with ar locale', () => {
		localeService.currentLocale = 'ar-EG';
		component.formControl.setValue(1234567);
		fixture.detectChanges();
		input.value = '١٢٣٤٥٦٧';
		input.dispatchEvent(new Event('input'));
		expect(component.formControl.value).toBe(1234567);
	});
});
