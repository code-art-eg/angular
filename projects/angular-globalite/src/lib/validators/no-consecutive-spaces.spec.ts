import { FormControl } from '@angular/forms';
import { noConsecutiveSpaces } from './no-consecutive-spaces';

describe('noConsecutiveSpaces Validator', () => {
	it('should return null if the control value does not have consecutive spaces', () => {
		const control = new FormControl('test value');
		const result = noConsecutiveSpaces(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value has consecutive spaces', () => {
		const control = new FormControl('test  value');
		const result = noConsecutiveSpaces(control);
		expect(result).toEqual({ noConsecutiveSpaces: true });
	});

	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		const result = noConsecutiveSpaces(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		const result = noConsecutiveSpaces(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is an empty string', () => {
		const control = new FormControl('');
		const result = noConsecutiveSpaces(control);
		expect(result).toBeNull();
	});
});
