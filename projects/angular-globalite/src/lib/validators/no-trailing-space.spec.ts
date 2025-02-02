import { FormControl } from '@angular/forms';
import { noTrailingSpace } from './no-trailing-space';

describe('noTrailingSpace Validator', () => {
	it('should return null if the control value does not have trailing spaces', () => {
		const control = new FormControl('test');
		const result = noTrailingSpace(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value has trailing spaces', () => {
		const control = new FormControl('test  ');
		const result = noTrailingSpace(control);
		expect(result).toEqual({ noTrailingSpace: true });
	});

	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		const result = noTrailingSpace(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		const result = noTrailingSpace(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is an empty string', () => {
		const control = new FormControl('');
		const result = noTrailingSpace(control);
		expect(result).toBeNull();
	});
});
