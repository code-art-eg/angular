import { FormControl } from '@angular/forms';
import { maxDate } from './max-date';
import { DateOnly } from '../types';

describe('maxDate Validator', () => {
	const maxDateValue = new Date(2023, 9, 10);

	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		const validator = maxDate(maxDateValue);
		expect(validator(control)).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		const validator = maxDate(maxDateValue);
		expect(validator(control)).toBeNull();
	});

	it('should return null if the control value is a date before the maximum date', () => {
		const control = new FormControl(new Date(2023, 9, 9));
		const validator = maxDate(maxDateValue);
		expect(validator(control)).toBeNull();
	});

	it('should return an error object if the control value is a date after the maximum date', () => {
		const control = new FormControl(new Date(2023, 9, 11));
		const validator = maxDate(maxDateValue);
		expect(validator(control)).toEqual({ maxDate: true });
	});

	it('should return null if the control value is a date equal to the maximum date', () => {
		const control = new FormControl(new Date(2023, 9, 10));
		const validator = maxDate(maxDateValue);
		expect(validator(control)).toBeNull();
	});

	it('should return null if the control value is a DateOnly object before the maximum date', () => {
		const control = new FormControl({
			year: 2023,
			month: 10,
			day: 9,
		} as DateOnly);
		const validator = maxDate(maxDateValue);
		expect(validator(control)).toBeNull();
	});

	it('should return an error object if the control value is a DateOnly object after the maximum date', () => {
		const control = new FormControl({
			year: 2023,
			month: 10,
			day: 11,
		} as DateOnly);
		const validator = maxDate(maxDateValue);
		expect(validator(control)).toEqual({ maxDate: true });
	});

	it('should return null if the control value is a DateOnly object equal to the maximum date', () => {
		const control = new FormControl({
			year: 2023,
			month: 10,
			day: 10,
		} as DateOnly);
		const validator = maxDate(maxDateValue);
		expect(validator(control)).toBeNull();
	});
});
