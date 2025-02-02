import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { compareValidator } from './compare-validator';
import { FORM_FIELD_CONTEXT } from '../constants';

describe('compareValidator', () => {
	it('should return null if the control value matches the comparison control value', () => {
		const formGroup = new FormGroup({
			control: new FormControl('value'),
			compareControl: new FormControl('value'),
		});
		const validator = compareValidator(
			'compare',
			'compareControl',
			r => r === 0
		);
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toBeNull();
	});

	it('should return null if the control value matches the comparison control value with dates', () => {
		const formGroup = new FormGroup({
			control: new FormControl(new Date(2023, 9, 10)),
			compareControl: new FormControl({ year: 2023, month: 10, day: 10 }),
		});
		const validator = compareValidator(
			'compare',
			'compareControl',
			r => r === 0
		);
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toBeNull();
	});

	it('should return null if the control value matches the comparison control value with numbers', () => {
		const formGroup = new FormGroup({
			control: new FormControl(10),
			compareControl: new FormControl(10),
		});
		const validator = compareValidator(
			'compare',
			'compareControl',
			r => r === 0
		);
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toBeNull();
	});

	it('should return null if the control value greater than the comparison control value with numbers', () => {
		const formGroup = new FormGroup({
			control: new FormControl(11),
			compareControl: new FormControl(10),
		});
		const validator = compareValidator(
			'compare',
			'compareControl',
			r => r > 0
		);
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toBeNull();
	});

	it('should return an error object if the control value does not match the comparison control value', () => {
		const formGroup = new FormGroup({
			control: new FormControl('value1'),
			compareControl: new FormControl('value2'),
		});
		const validator = compareValidator(
			'compare',
			'compareControl',
			r => r === 0
		);
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toEqual({
			compare: {
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
		const validator = compareValidator(
			'compare',
			'compareControl',
			r => r === 0
		);
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toBeNull();
	});

	it('should return null if the control value is null', () => {
		const formGroup = new FormGroup({
			control: new FormControl(null),
			compareControl: new FormControl('value'),
		});
		const validator = compareValidator(
			'compare',
			'compareControl',
			r => r === 0
		);
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toBeNull();
	});

	it('should return null if the comparison control value is null', () => {
		const formGroup = new FormGroup({
			control: new FormControl('value'),
			compareControl: new FormControl(null),
		});
		const validator = compareValidator(
			'compare',
			'compareControl',
			r => r === 0
		);
		const control = formGroup.get('control') as AbstractControl;
		expect(validator(control)).toBeNull();
	});
});
