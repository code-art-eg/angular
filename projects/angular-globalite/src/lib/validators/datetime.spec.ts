import { FormControl } from '@angular/forms';
import { datetime } from './datetime';

describe('datetime Validator', () => {
	it('should return null if the control value is a valid datetime', () => {
		const control = new FormControl(new Date());
		const result = datetime(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value is not a valid datetime', () => {
		const control = new FormControl('invalid-datetime');
		const result = datetime(control);
		expect(result).toEqual({ datetime: true });
	});

	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		const result = datetime(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		const result = datetime(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is an empty string', () => {
		const control = new FormControl('');
		const result = datetime(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is a valid date without time', () => {
		const control = new FormControl(new Date(2000, 5, 2));
		const result = datetime(control);
		expect(result).toBeNull();
	});
});
