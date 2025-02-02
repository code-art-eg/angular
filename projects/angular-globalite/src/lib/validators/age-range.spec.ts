import { FormControl } from '@angular/forms';
import { ageRange } from './age-range';
import { DateOnly } from '../types';

describe('ageRange Validator', () => {
	const minAge = 18;
	const maxAge = 65;

	beforeAll(() => {
		const currentDate = new Date(2023, 0, 1); // January 1, 2023
		jasmine.clock().mockDate(currentDate);
	});

	afterAll(() => {
		jasmine.clock().uninstall();
	});

	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		const validator = ageRange(minAge, maxAge);
		expect(validator(control)).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		const validator = ageRange(minAge, maxAge);
		expect(validator(control)).toBeNull();
	});

	it('should return null if the control value is a valid age within the range', () => {
		const birthDate = new Date();
		birthDate.setFullYear(birthDate.getFullYear() - 30);
		const control = new FormControl(birthDate);
		const validator = ageRange(minAge, maxAge);
		expect(validator(control)).toBeNull();
	});

	it('should return an error object if the control value is a valid age below the range', () => {
		const birthDate = new Date();
		birthDate.setFullYear(birthDate.getFullYear() - 10);
		const control = new FormControl(birthDate);
		const validator = ageRange(minAge, maxAge);
		expect(validator(control)).toEqual({
			ageRange: { minAge, maxAge, actual: 10 },
		});
	});

	it('should return an error object if the control value is a valid age above the range', () => {
		const birthDate = new Date();
		birthDate.setFullYear(birthDate.getFullYear() - 70);
		const control = new FormControl(birthDate);
		const validator = ageRange(minAge, maxAge);
		expect(validator(control)).toEqual({
			ageRange: { minAge, maxAge, actual: 70 },
		});
	});

	it('should return null if the control value is a valid DateOnly object within the range', () => {
		const birthDateOnly: DateOnly = { year: 1990, month: 1, day: 1 };
		const control = new FormControl(birthDateOnly);
		const validator = ageRange(minAge, maxAge);
		expect(validator(control)).toBeNull();
	});

	it('should return an error object if the control value is a valid DateOnly object below the range', () => {
		const birthDateOnly: DateOnly = { year: 2015, month: 1, day: 1 };
		const control = new FormControl(birthDateOnly);
		const validator = ageRange(minAge, maxAge);
		expect(validator(control)).toEqual({
			ageRange: { minAge, maxAge, actual: 8 },
		});
	});

	it('should return an error object if the control value is a valid DateOnly object above the range', () => {
		const birthDateOnly: DateOnly = { year: 1950, month: 1, day: 1 };
		const control = new FormControl(birthDateOnly);
		const validator = ageRange(minAge, maxAge);
		expect(validator(control)).toEqual({
			ageRange: { minAge, maxAge, actual: 73 },
		});
	});

	it('should return an error object if the control value is not a date', () => {
		const control = new FormControl('not a date');
		const validator = ageRange(minAge, maxAge);
		expect(validator(control)).toEqual({
			ageRange: { minAge, maxAge, actual: 'not a date' },
		});
	});
});
