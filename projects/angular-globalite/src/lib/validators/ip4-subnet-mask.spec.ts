import { FormControl } from '@angular/forms';
import { ip4SubnetMask } from './ip4-subnet-mask';

describe('ip4SubnetMask Validator', () => {
	it('should return null if the control value is a valid subnet mask', () => {
		const control = new FormControl('255.255.255.0');
		const result = ip4SubnetMask(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value is not a valid subnet mask', () => {
		const control = new FormControl('255.255.255.1');
		const result = ip4SubnetMask(control);
		expect(result).toEqual({ subnet: true });
	});

	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		const result = ip4SubnetMask(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		const result = ip4SubnetMask(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is an empty string', () => {
		const control = new FormControl('');
		const result = ip4SubnetMask(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value is a malformed subnet mask', () => {
		const control = new FormControl('255.255.255');
		const result = ip4SubnetMask(control);
		expect(result).toEqual({ subnet: true });
	});

	it('should return an error object if the control value contains letters', () => {
		const control = new FormControl('255.255.255.a');
		const result = ip4SubnetMask(control);
		expect(result).toEqual({ subnet: true });
	});
});
