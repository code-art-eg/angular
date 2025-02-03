import { FormControl } from '@angular/forms';
import { phone } from './phone';

describe('phone Validator', () => {
	it('should return null if the control value is a valid phone number', () => {
		const control = new FormControl('+1234567890');
		const result = phone(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value is not a valid phone number', () => {
		const control = new FormControl('invalid-phone');
		const result = phone(control);
		expect(result).toEqual({ phone: true });
	});

	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		const result = phone(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		const result = phone(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is an empty string', () => {
		const control = new FormControl('');
		const result = phone(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value contains letters', () => {
		const control = new FormControl('12345abcde');
		const result = phone(control);
		expect(result).toEqual({ phone: true });
	});

	it('should return an error object if the control value is too short', () => {
		const control = new FormControl('123');
		const result = phone(control);
		expect(result).toEqual({ phone: true });
	});

	it('should return an error object if the control value is too long', () => {
		const control = new FormControl('12345678901234567890');
		const result = phone(control);
		expect(result).toEqual({ phone: true });
	});
});
