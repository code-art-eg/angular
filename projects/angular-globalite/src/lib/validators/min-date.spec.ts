import { FormControl } from '@angular/forms';
import { minDate } from './min-date';
import { DateOnly } from '../types';

describe('minDate Validator', () => {
	const minDateValue = new Date(2023, 9, 10);

	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		const validator = minDate(minDateValue);
		expect(validator(control)).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		const validator = minDate(minDateValue);
		expect(validator(control)).toBeNull();
	});

	it('should return null if the control value is a date after the minimum date', () => {
		const control = new FormControl(new Date(2023, 9, 11));
		const validator = minDate(minDateValue);
		expect(validator(control)).toBeNull();
	});

	it('should return an error object if the control value is a date before the minimum date', () => {
		const control = new FormControl(new Date(2023, 9, 9));
		const validator = minDate(minDateValue);
		expect(validator(control)).toEqual({ minDate: true });
	});

	it('should return null if the control value is a date equal to the minimum date', () => {
		const control = new FormControl(new Date(2023, 9, 10));
		const validator = minDate(minDateValue);
		expect(validator(control)).toBeNull();
	});

	it('should return null if the control value is a DateOnly object after the minimum date', () => {
		const control = new FormControl({
			year: 2023,
			month: 10,
			day: 11,
		} as DateOnly);
		const validator = minDate(minDateValue);
		expect(validator(control)).toBeNull();
	});

	it('should return an error object if the control value is a DateOnly object before the minimum date', () => {
		const control = new FormControl({
			year: 2023,
			month: 10,
			day: 9,
		} as DateOnly);
		const validator = minDate(minDateValue);
		expect(validator(control)).toEqual({ minDate: true });
	});

	it('should return null if the control value is a DateOnly object equal to the minimum date', () => {
		const control = new FormControl({
			year: 2023,
			month: 10,
			day: 10,
		} as DateOnly);
		const validator = minDate(minDateValue);
		expect(validator(control)).toBeNull();
	});
});
