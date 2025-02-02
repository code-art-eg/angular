import { FormControl } from '@angular/forms';
import { integer } from './integer';

describe('integer Validator', () => {
	it('should return null if the control value is a valid integer', () => {
		const control = new FormControl(123);
		const result = integer(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value is not a valid integer', () => {
		const control = new FormControl(123.45);
		const result = integer(control);
		expect(result).toEqual({ integer: true });
	});

	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		const result = integer(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		const result = integer(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is an empty string', () => {
		const control = new FormControl('');
		const result = integer(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value contains letters', () => {
		const control = new FormControl('123abc');
		const result = integer(control);
		expect(result).toEqual({ integer: true });
	});

	it('should return null if the control value is a negative integer', () => {
		const control = new FormControl(-123);
		const result = integer(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value is a floating point number', () => {
		const control = new FormControl(123.0);
		const result = integer(control);
		expect(result).toBeNull();
	});
});
