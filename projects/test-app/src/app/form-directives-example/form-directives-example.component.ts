import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import {
	GlobalizeDateOnlyDirective,
	GlobalizeDateTimeDirective,
	GlobalizeIntegerDirective,
	GlobalizeNullDirective,
	GlobalizeNumberDirective,
} from '@code-art-eg/angular-globalite';

@Component({
	selector: 'app-form-directives-example',
	imports: [
		ReactiveFormsModule,
		JsonPipe,
		GlobalizeIntegerDirective,
		GlobalizeNullDirective,
		GlobalizeNumberDirective,
		GlobalizeDateTimeDirective,
		GlobalizeDateOnlyDirective,
	],
	templateUrl: './form-directives-example.component.html',
})
export class FormDirectivesExampleComponent {
	form = new FormGroup({
		dateOnlyValue: new FormControl({ year: 2000, month: 1, day: 20 }),
		dateValue: new FormControl(new Date(2000, 0, 20, 10, 30, 0)),
		numericValue: new FormControl(123456.789),
		textValue: new FormControl('Hello, world!'),
		integerValue: new FormControl(123456),
	});
}
