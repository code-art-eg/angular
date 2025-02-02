import { FormControl } from '@angular/forms';
import { color } from './color';

describe('color Validator', () => {
	it('should return null if the control value is a valid 3-digit hex color code', () => {
		const control = new FormControl('#abc');
		const result = color(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is a valid 6-digit hex color code', () => {
		const control = new FormControl('#abcdef');
		const result = color(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is a valid 8-digit hex color code', () => {
		const control = new FormControl('#abcdef12');
		const result = color(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value is not a valid hex color code', () => {
		const control = new FormControl('#abcd');
		const result = color(control);
		expect(result).toEqual({ color: true });
	});

	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		const result = color(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		const result = color(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is an empty string', () => {
		const control = new FormControl('');
		const result = color(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value contains invalid characters', () => {
		const control = new FormControl('#abcg');
		const result = color(control);
		expect(result).toEqual({ color: true });
	});
});
