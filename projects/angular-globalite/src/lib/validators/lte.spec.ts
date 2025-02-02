import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { lte } from './lte';
import { FORM_FIELD_CONTEXT } from '../constants';

describe('lte Validator', () => {
	it('should return null if the control value is less than or equal to the comparison control value', () => {
		const formGroup = new FormGroup({
			control: new FormControl(5),
			compareControl: new FormControl(10),
		});
		const validator = lte('compareControl');
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toBeNull();
	});

	it('should return an error object if the control value is greater than the comparison control value', () => {
		const formGroup = new FormGroup({
			control: new FormControl(10),
			compareControl: new FormControl(5),
		});
		const validator = lte('compareControl');
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toEqual({
			lte: {
				otherKey: {
					messageKey: 'compareControl',
					context: FORM_FIELD_CONTEXT,
				},
			},
		});
	});

	it('should return null if the comparison control is not found', () => {
		const formGroup = new FormGroup({
			control: new FormControl(10),
		});
		const validator = lte('compareControl');
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toBeNull();
	});

	it('should return null if the control value is null', () => {
		const formGroup = new FormGroup({
			control: new FormControl(null),
			compareControl: new FormControl(5),
		});
		const validator = lte('compareControl');
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toBeNull();
	});

	it('should return null if the comparison control value is null', () => {
		const formGroup = new FormGroup({
			control: new FormControl(10),
			compareControl: new FormControl(null),
		});
		const validator = lte('compareControl');
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toBeNull();
	});
});
