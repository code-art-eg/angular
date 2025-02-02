import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalizeNullDirective } from './globalize-null.directive';
import { LOCALE_PROVIDERS_TOKEN } from '../provider-tokens';
import { LocaleProvider } from '../types';
import { SUPPORTED_LOCALES_TOKEN } from '../constants';

@Component({
	imports: [ReactiveFormsModule, GlobalizeNullDirective],
	template: ` <input type="text" glbToNull [formControl]="formControl" /> `,
})
class TestComponent {
	public readonly formControl: FormControl;

	constructor(formBuilder: FormBuilder) {
		this.formControl = formBuilder.control('Hello');
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

describe('GlobalizeNullDirective', () => {
	let fixture: ComponentFixture<TestComponent>;
	let component: TestComponent;
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
		input = fixture.debugElement.query(By.css('input'))
			.nativeElement as HTMLInputElement;
	});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});

	it('update reflect the value of the control on the input element', () => {
		expect(component.formControl.value).toBe('Hello');
		fixture.detectChanges();
		expect(input.value).toBe('Hello');
	});

	it('update the model value to null when input is an empty string', () => {
		fixture.detectChanges();
		input.value = '';
		input.dispatchEvent(new Event('input'));
		expect(component.formControl.value).toBeNull();
	});

	it('update the model value to value when input a value is entered', () => {
		fixture.detectChanges();
		input.value = 'World';
		input.dispatchEvent(new Event('input'));
		expect(component.formControl.value).toBe('World');
	});
});
