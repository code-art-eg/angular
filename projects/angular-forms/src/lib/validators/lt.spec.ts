import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { lt } from './lt';
import { FORM_FIELD_CONTEXT } from '../constants';

describe('lt Validator', () => {
	it('should return null if the control value is less than the comparison control value', () => {
		const formGroup = new FormGroup({
			control: new FormControl(5),
			compareControl: new FormControl(10),
		});
		const validator = lt('compareControl');
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toBeNull();
	});

	it('should return an error object if the control value is greater than or equal to the comparison control value', () => {
		const formGroup = new FormGroup({
			control: new FormControl(10),
			compareControl: new FormControl(5),
		});
		const validator = lt('compareControl');
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toEqual({
			lt: {
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
		const validator = lt('compareControl');
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toBeNull();
	});

	it('should return null if the control value is null', () => {
		const formGroup = new FormGroup({
			control: new FormControl(null),
			compareControl: new FormControl(5),
		});
		const validator = lt('compareControl');
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toBeNull();
	});

	it('should return null if the comparison control value is null', () => {
		const formGroup = new FormGroup({
			control: new FormControl(10),
			compareControl: new FormControl(null),
		});
		const validator = lt('compareControl');
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toBeNull();
	});
});
