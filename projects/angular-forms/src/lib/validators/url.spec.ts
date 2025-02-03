// noinspection HttpUrlsUsage

import { FormControl } from '@angular/forms';
import { url } from './url';

describe('url Validator', () => {
	it('should return null if the control value is a valid URL', () => {
		const control = new FormControl('https://example.com');
		const result = url(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value is not a valid URL', () => {
		const control = new FormControl('invalid-url');
		const result = url(control);
		expect(result).toEqual({ url: true });
	});

	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		const result = url(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		const result = url(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is an empty string', () => {
		const control = new FormControl('');
		const result = url(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value is a malformed URL', () => {
		const control = new FormControl('http://example');
		const result = url(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value contains spaces', () => {
		const control = new FormControl('http://example .com');
		const result = url(control);
		expect(result).toEqual({ url: true });
	});

	it('should return null if the control value is a valid IP address', () => {
		const control = new FormControl('http://192.168.0.1');
		const result = url(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value is a bad IP address', () => {
		const control = new FormControl('http://999.999.999.999');
		const result = url(control);
		expect(result).toEqual({ url: true });
	});

	it('should return null if the control value contains a username', () => {
		const control = new FormControl('http://user@example.com');
		const result = url(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value contains a username and password', () => {
		const control = new FormControl('http://user:pass@example.com');
		const result = url(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value contains a query string', () => {
		const control = new FormControl('http://example.com?query=string');
		const result = url(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value contains a fragment', () => {
		const control = new FormControl('http://example.com#fragment');
		const result = url(control);
		expect(result).toBeNull();
	});
});
