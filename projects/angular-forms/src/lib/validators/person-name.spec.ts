import { FormControl } from '@angular/forms';
import { personName } from './person-name';

describe('personName Validator', () => {
	it('should return null if the control value is a valid person name', () => {
		const control = new FormControl('John Doe');
		const result = personName(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is a valid arabic person name', () => {
		const control = new FormControl('فلان الفلاني');
		const result = personName(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is a valid russian person name', () => {
		const control = new FormControl('Иван Иванович');
		const result = personName(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value is not a valid person name', () => {
		const control = new FormControl('John123');
		const result = personName(control);
		expect(result).toEqual({ personName: true });
	});

	it('should return null if the control value is null', () => {
		const control = new FormControl(null);
		const result = personName(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is undefined', () => {
		const control = new FormControl(undefined);
		const result = personName(control);
		expect(result).toBeNull();
	});

	it('should return null if the control value is an empty string', () => {
		const control = new FormControl('');
		const result = personName(control);
		expect(result).toBeNull();
	});

	it('should return an error object if the control value contains special characters', () => {
		const control = new FormControl('John@Doe');
		const result = personName(control);
		expect(result).toEqual({ personName: true });
	});
});
