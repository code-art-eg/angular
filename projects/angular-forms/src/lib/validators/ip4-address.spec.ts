import { FormControl } from '@angular/forms';
import { ip4Address } from './ip4-address';

describe('ip4Address Validator', () => {
	it('should return null if the control value is a valid IP address', () => {
		const control = new FormControl('192.168.1.1');
		const result = ip4Address(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is a valid IP address', () => {
		const control = new FormControl('256.168.1.1');
		const result = ip4Address(control);
		expect(result).toEqual({ ip4: true });
	});

	it('should return an error object if the control value is not a valid IP address', () => {
		const control = new FormControl('999.999.999.999');
		const result = ip4Address(control);
		expect(result).toEqual({ ip4: true });
	});

	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		const result = ip4Address(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		const result = ip4Address(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is an empty string', () => {
		const control = new FormControl('');
		const result = ip4Address(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value is a malformed IP address', () => {
		const control = new FormControl('192.168.1');
		const result = ip4Address(control);
		expect(result).toEqual({ ip4: true });
	});

	it('should return an error object if the control value contains letters', () => {
		const control = new FormControl('192.168.1.a');
		const result = ip4Address(control);
		expect(result).toEqual({ ip4: true });
	});
});
