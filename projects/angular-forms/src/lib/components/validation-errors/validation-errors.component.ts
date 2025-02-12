import { Component, inject, Input, OnInit } from '@angular/core';
import { FORM_STYLE_INJECTION_TOKEN } from '../../styling-tokens';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ParameterizedMessageDirective } from '../../directives/parameterized-message.directive';
import { ControlStyleOptions, ParameterizedMessage } from '../../types';
import { getControlParameterizedErrors } from '../../util/get-control-parameterized-errors';

@Component({
	selector: 'frm-validation-errors',
	imports: [NgClass, ParameterizedMessageDirective],
	templateUrl: './validation-errors.component.html',
})
export class ValidationErrorsComponent implements OnInit {
	readonly #defaultStyles = inject(FORM_STYLE_INJECTION_TOKEN);
	#styles: ControlStyleOptions = this.#defaultStyles;
	readonly #formGroup = inject(FormGroupDirective, { optional: true });

	#control: AbstractControl | null = null;
	#name: (string | number)[] | string | null = null;
	#controlName: (string | number)[] | string | null = null;
	#controlSet = false;

	@Input() set controlStyles(styles: ControlStyleOptions) {
		this.#styles = { ...this.#defaultStyles, ...styles };
	}

	get controlStyles() {
		return this.#styles;
	}

	@Input()
	public set control(val: AbstractControl | null) {
		this.#control = val;
		this.#controlName = null;
		this.#name = null;
		this.#controlSet = true;
	}

	public get control(): AbstractControl | null {
		if (!this.#control || this.#controlName !== this.#name) {
			this.#controlName = this.#name;
			if (!this.#controlSet && this.#name) {
				if (this.#formGroup) {
					this.#control = this.#formGroup.control.get(this.#name);
				} else {
					this.#control = null;
				}
			} else {
				this.#control = null;
			}
		}
		return this.#control;
	}

	@Input()
	public set name(val: (string | number)[] | string) {
		if (!this.#formGroup) {
			throw new Error(`Cannot set name property on ValidationErrorsComponent without a formGroup.
      Please use the frmControl property or use a component withing a container having [FormGroup] directive.`);
		}
		this.#name = val;
		this.#control = null;
		this.#controlSet = false;
	}

	public get dummyControlClass(): Record<string, boolean> {
		const res: Record<string, boolean> = {};
		if (this.#styles.formControlCssClass) {
			res[this.#styles.formControlCssClass] = true;
		}
		if (this.#styles.formControlInvalidCssClass && this.invalid) {
			res[this.#styles.formControlInvalidCssClass] = true;
		}
		if (this.#styles.formControlValidCssClass && this.valid) {
			res[this.#styles.formControlValidCssClass] = true;
		}
		return res;
	}

	public get touched(): boolean {
		return !!(this.control && this.control.touched);
	}

	public get invalid(): boolean {
		return !!(this.control && this.control.invalid);
	}

	public get valid(): boolean {
		return !!(this.control && this.control.valid);
	}

	public get disabled(): boolean {
		return !!(this.control && this.control.disabled);
	}

	public get showError(): boolean {
		return this.invalid && this.touched && !this.disabled;
	}

	public get errors(): ParameterizedMessage[] {
		return this.control ? getControlParameterizedErrors(this.control) : [];
	}

	public ngOnInit(): void {
		if (!this.control) {
			const error = `Control for ValidationErrorsComponent was not initialized.
       You can either set it by setting the control property
       or by including it in a container with [FormGroup] directive and setting the name property.`;
			throw new Error(error);
		}
	}
}
