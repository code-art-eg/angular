import { FormControl } from '@angular/forms';
import { noQuotesOrSlashes } from './no-quotes-or-slashes';

describe('noQuotesOrSlashes Validator', () => {
	it('should return null if the control value does not contain quotes or slashes', () => {
		const control = new FormControl('test value');
		const result = noQuotesOrSlashes(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value contains single quotes', () => {
		const control = new FormControl("test'value");
		const result = noQuotesOrSlashes(control);
		expect(result).toEqual({ noQuotesOrSlashes: true });
	});

	it('should return an error object if the control value contains double quotes', () => {
		const control = new FormControl('test"value');
		const result = noQuotesOrSlashes(control);
		expect(result).toEqual({ noQuotesOrSlashes: true });
	});

	it('should return an error object if the control value contains backslashes', () => {
		const control = new FormControl('test\\value');
		const result = noQuotesOrSlashes(control);
		expect(result).toEqual({ noQuotesOrSlashes: true });
	});

	it('should return an error object if the control value contains forward slashes', () => {
		const control = new FormControl('test/value');
		const result = noQuotesOrSlashes(control);
		expect(result).toEqual({ noQuotesOrSlashes: true });
	});

	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		const result = noQuotesOrSlashes(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		const result = noQuotesOrSlashes(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is an empty string', () => {
		const control = new FormControl('');
		const result = noQuotesOrSlashes(control);
		expect(result).toBeNull();
	});
});
