import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { neq } from './neq';
import { FORM_FIELD_CONTEXT } from '../constants';

describe('neq Validator', () => {
	it('should return null if the control value does not match the comparison control value', () => {
		const formGroup = new FormGroup({
			control: new FormControl('value1'),
			compareControl: new FormControl('value2'),
		});
		const validator = neq('compareControl');
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toBeNull();
	});

	it('should return an error object if the control value matches the comparison control value', () => {
		const formGroup = new FormGroup({
			control: new FormControl('value'),
			compareControl: new FormControl('value'),
		});
		const validator = neq('compareControl');
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toEqual({
			neq: {
				otherKey: {
					messageKey: 'compareControl',
					context: FORM_FIELD_CONTEXT,
				},
			},
		});
	});

	it('should return null if the comparison control is not found', () => {
		const formGroup = new FormGroup({
			control: new FormControl('value'),
		});
		const validator = neq('compareControl');
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toBeNull();
	});

	it('should return null if the control value is null', () => {
		const formGroup = new FormGroup({
			control: new FormControl(null),
			compareControl: new FormControl('value'),
		});
		const validator = neq('compareControl');
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toBeNull();
	});

	it('should return null if the comparison control value is null', () => {
		const formGroup = new FormGroup({
			control: new FormControl('value'),
			compareControl: new FormControl(null),
		});
		const validator = neq('compareControl');
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toBeNull();
	});
});
