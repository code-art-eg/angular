import { FormControl, FormGroup } from '@angular/forms';
import { getControlParameterizedErrorsRecursive } from './get-control-parameterized-errors-recursive';

describe('getControlParameterizedErrorsRecursive', () => {
	it('should return errors for no controls in a flat form group when not touched', () => {
		const formGroup = new FormGroup({
			control1: new FormControl('', {
				validators: [() => ({ error1: 'Error 1' })],
			}),
			control2: new FormControl('', {
				validators: [() => ({ error2: 'Error 2' })],
			}),
		});

		const errors = getControlParameterizedErrorsRecursive(formGroup, true);
		expect(errors).toEqual([]);
	});

	it('should return errors for no controls in a nested form group when not touched', () => {
		const formGroup = new FormGroup({
			control1: new FormControl('', {
				validators: [() => ({ error1: 'Error 1' })],
			}),
			nestedGroup: new FormGroup({
				control2: new FormControl('', {
					validators: [() => ({ error2: 'Error 2' })],
				}),
			}),
		});

		const errors = getControlParameterizedErrorsRecursive(formGroup, true);
		expect(errors).toEqual([]);
	});

	it('should return errors for all controls in a flat form group when not touched', () => {
		const formGroup = new FormGroup({
			control1: new FormControl('', {
				validators: [() => ({ error1: 'Error 1' })],
			}),
			control2: new FormControl('', {
				validators: [() => ({ error2: 'Error 2' })],
			}),
		});

		const errors = getControlParameterizedErrorsRecursive(formGroup, false);
		expect(errors).toEqual([
			{
				messageKey: 'Error 1',
				context: 'formValidation',
				parameters: false,
			},
			{
				messageKey: 'Error 2',
				context: 'formValidation',
				parameters: false,
			},
		]);
	});

	it('should return errors for all controls in a nested form group when not touched', () => {
		const formGroup = new FormGroup({
			control1: new FormControl('', {
				validators: [() => ({ error1: 'Error 1' })],
			}),
			nestedGroup: new FormGroup({
				control2: new FormControl('', {
					validators: [() => ({ error2: 'Error 2' })],
				}),
			}),
		});

		const errors = getControlParameterizedErrorsRecursive(formGroup, false);
		expect(errors).toEqual([
			{
				messageKey: 'Error 1',
				context: 'formValidation',
				parameters: false,
			},
			{
				messageKey: 'Error 2',
				context: 'formValidation',
				parameters: false,
			},
		]);
	});

	it('should return errors for all controls in a flat form group when touched', () => {
		const formGroup = new FormGroup({
			control1: new FormControl('', {
				validators: [() => ({ error1: 'Error 1' })],
			}),
			control2: new FormControl('', {
				validators: [() => ({ error2: 'Error 2' })],
			}),
		});

		formGroup.markAllAsTouched();

		const errors = getControlParameterizedErrorsRecursive(formGroup, true);
		expect(errors).toEqual([
			{
				messageKey: 'Error 1',
				context: 'formValidation',
				parameters: false,
			},
			{
				messageKey: 'Error 2',
				context: 'formValidation',
				parameters: false,
			},
		]);
	});

	it('should return errors for all controls in a nested form group when touched', () => {
		const formGroup = new FormGroup({
			control1: new FormControl('', {
				validators: [() => ({ error1: 'Error 1' })],
			}),
			nestedGroup: new FormGroup({
				control2: new FormControl('', {
					validators: [() => ({ error2: 'Error 2' })],
				}),
			}),
		});

		formGroup.markAllAsTouched();

		const errors = getControlParameterizedErrorsRecursive(formGroup, true);
		expect(errors).toEqual([
			{
				messageKey: 'Error 1',
				context: 'formValidation',
				parameters: false,
			},
			{
				messageKey: 'Error 2',
				context: 'formValidation',
				parameters: false,
			},
		]);
	});
});
