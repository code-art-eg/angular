import { FormControl } from '@angular/forms';
import { email } from './email';

describe('email Validator', () => {
	it('should return null if the control value is a valid email address', () => {
		const control = new FormControl('test@example.com');
		const result = email(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value is not a valid email address', () => {
		const control = new FormControl('invalid-email');
		const result = email(control);
		expect(result).toEqual({ email: true });
	});

	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		const result = email(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		const result = email(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is an empty string', () => {
		const control = new FormControl('');
		const result = email(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value is a malformed email address', () => {
		const control = new FormControl('test@.com');
		const result = email(control);
		expect(result).toEqual({ email: true });
	});

	it('should return an error object if the control value contains spaces', () => {
		const control = new FormControl('test @example.com');
		const result = email(control);
		expect(result).toEqual({ email: true });
	});
});
