import { FormControl } from '@angular/forms';
import { noLeadingSpace } from './no-leading-space';

describe('noLeadingSpace Validator', () => {
	it('should return null if the control value does not have leading spaces', () => {
		const control = new FormControl('test');
		const result = noLeadingSpace(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value has leading spaces', () => {
		const control = new FormControl('  test');
		const result = noLeadingSpace(control);
		expect(result).toEqual({ noLeadingSpace: true });
	});

	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		const result = noLeadingSpace(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		const result = noLeadingSpace(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is an empty string', () => {
		const control = new FormControl('');
		const result = noLeadingSpace(control);
		expect(result).toBeNull();
	});
});
