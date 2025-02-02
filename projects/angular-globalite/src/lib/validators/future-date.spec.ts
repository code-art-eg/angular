import { FormControl } from '@angular/forms';
import { futureDate } from './future-date';
import { DateOnly } from '../types';

describe('futureDate Validator', () => {
	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		const validator = futureDate();
		expect(validator(control)).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		const validator = futureDate();
		expect(validator(control)).toBeNull();
	});

	it('should return an error object if the control value is a date in the past', () => {
		const pastDate = new Date();
		pastDate.setDate(pastDate.getDate() - 1);
		const control = new FormControl(pastDate);
		const validator = futureDate();
		expect(validator(control)).toEqual({ futureDate: true });
	});

	it('should return null if the control value is a date in the future', () => {
		const futureDateValue = new Date();
		futureDateValue.setDate(futureDateValue.getDate() + 1);
		const control = new FormControl(futureDateValue);
		const validator = futureDate();
		expect(validator(control)).toBeNull();
	});

	it('should return an error object if the control value is a DateOnly object in the past', () => {
		const pastDateOnly = { year: 2022, month: 9, day: 10 } as DateOnly;
		const control = new FormControl(pastDateOnly);
		const validator = futureDate();
		expect(validator(control)).toEqual({ futureDate: true });
	});

	it('should return null if the control value is a DateOnly object in the future', () => {
		const now = new Date();
		const futureDateOnly = {
			year: now.getFullYear() + 1,
			month: 9,
			day: 10,
		} as DateOnly;
		const control = new FormControl(futureDateOnly);
		const validator = futureDate();
		expect(validator(control)).toBeNull();
	});
});
