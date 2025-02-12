import { Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { neq, ValidationErrorsComponent } from '@code-art-eg/angular-forms';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'app-form-example',
	imports: [ReactiveFormsModule, JsonPipe, ValidationErrorsComponent],
	templateUrl: './form-example.component.html',
})
export class FormExampleComponent {
	readonly form = new FormGroup({
		name: new FormControl('', [Validators.required, neq('otherName')]),
		otherName: new FormControl('', [Validators.required]),
	});
}
