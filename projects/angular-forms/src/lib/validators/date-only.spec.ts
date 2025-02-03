import { FormControl } from '@angular/forms';
import { dateOnly } from './date-only';

describe('dateOnly Validator', () => {
	it('should return null if the control value is a valid date without time', () => {
		const control = new FormControl(new Date(2023, 9, 10));
		const result = dateOnly(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value is not a valid date', () => {
		const control = new FormControl('invalid-date');
		const result = dateOnly(control);
		expect(result).toEqual({ dateOnly: true });
	});

	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		const result = dateOnly(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		const result = dateOnly(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is an empty string', () => {
		const control = new FormControl('');
		const result = dateOnly(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value contains time', () => {
		const control = new FormControl(new Date(2023, 9, 10, 12, 30, 0));
		const result = dateOnly(control);
		expect(result).toEqual({ dateOnly: true });
	});

	it('should return an error object if the control value contains hour component', () => {
		const control = new FormControl(new Date(2023, 9, 10, 12));
		const result = dateOnly(control);
		expect(result).toEqual({ dateOnly: true });
	});

	it('should return an error object if the control value contains minute component', () => {
		const control = new FormControl(new Date(2023, 9, 10, 0, 30));
		const result = dateOnly(control);
		expect(result).toEqual({ dateOnly: true });
	});

	it('should return an error object if the control value contains second component', () => {
		const control = new FormControl(new Date(2023, 9, 10, 0, 0, 30));
		const result = dateOnly(control);
		expect(result).toEqual({ dateOnly: true });
	});

	it('should return an error object if the control value contains millisecond component', () => {
		const control = new FormControl(new Date(2023, 9, 10, 0, 0, 0, 500));
		const result = dateOnly(control);
		expect(result).toEqual({ dateOnly: true });
	});

	it('should return null if the control value is a DateOnly object', () => {
		const control = new FormControl({ year: 2023, month: 9, day: 10 });
		const result = dateOnly(control);
		expect(result).toBeNull();
	});
});
