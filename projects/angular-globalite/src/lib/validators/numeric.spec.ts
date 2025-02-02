import { FormControl } from '@angular/forms';
import { numeric } from './numeric';

describe('numeric Validator', () => {
	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		expect(numeric(control)).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		expect(numeric(control)).toBeNull();
	});

	it('should return null if the control value is a valid number', () => {
		const control = new FormControl(123);
		expect(numeric(control)).toBeNull();
	});

	it('should return an error object if the control value is not a valid number', () => {
		const control = new FormControl('abc');
		expect(numeric(control)).toEqual({ integer: true });
	});

	it('should return null if the control value is a number with fractions', () => {
		const control = new FormControl(123.456);
		expect(numeric(control)).toBeNull();
	});

	it('should return an error object if the control value is a string representation of an invalid number', () => {
		const control = new FormControl('123abc');
		expect(numeric(control)).toEqual({ integer: true });
	});

	it('should return an error object if the control value is NaN', () => {
		const control = new FormControl(NaN);
		expect(numeric(control)).toEqual({ integer: true });
	});

	it('should return an error object if the control value is infinity', () => {
		const control = new FormControl(Infinity);
		expect(numeric(control)).toEqual({ integer: true });
	});

	it('should return an error object if the control value is -infinity', () => {
		const control = new FormControl(-Infinity);
		expect(numeric(control)).toEqual({ integer: true });
	});
});
