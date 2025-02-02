import { FormControl } from '@angular/forms';
import { pastDate } from './past-date';
import { DateOnly } from '../types';

describe('pastDate Validator', () => {
	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		const validator = pastDate();
		expect(validator(control)).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		const validator = pastDate();
		expect(validator(control)).toBeNull();
	});

	it('should return an error object if the control value is a date in the future', () => {
		const futureDate = new Date();
		futureDate.setDate(futureDate.getDate() + 1);
		const control = new FormControl(futureDate);
		const validator = pastDate();
		expect(validator(control)).toEqual({ pastDate: true });
	});

	it('should return null if the control value is a date in the past', () => {
		const pastDateValue = new Date();
		pastDateValue.setDate(pastDateValue.getDate() - 1);
		const control = new FormControl(pastDateValue);
		const validator = pastDate();
		expect(validator(control)).toBeNull();
	});

	it('should return an error object if the control value is a DateOnly object in the future', () => {
		const futureDateOnly = {
			year: new Date().getFullYear() + 1,
			month: 9,
			day: 10,
		} as DateOnly;
		const control = new FormControl(futureDateOnly);
		const validator = pastDate();
		expect(validator(control)).toEqual({ pastDate: true });
	});

	it('should return null if the control value is a DateOnly object in the past', () => {
		const pastDateOnly = { year: 2022, month: 9, day: 10 } as DateOnly;
		const control = new FormControl(pastDateOnly);
		const validator = pastDate();
		expect(validator(control)).toBeNull();
	});
});
