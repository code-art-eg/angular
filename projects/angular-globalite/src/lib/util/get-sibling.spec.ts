import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { getSibling } from './get-sibling';

describe('getSibling Utility Function', () => {
	it('should return null if the control has no parent', () => {
		const control = new FormControl();
		expect(getSibling(control, 'sibling')).toBeNull();
	});

	it('should return the sibling control by name in a FormGroup', () => {
		const sibling = new FormControl('sibling value');
		const control = new FormControl('control value');
		new FormGroup({
			control: control,
			sibling: sibling,
		});
		expect(getSibling(control, 'sibling')).toBe(sibling);
	});

	it('should return null if the sibling control does not exist in a FormGroup', () => {
		const control = new FormControl('control value');
		new FormGroup({
			control: control,
		});
		expect(getSibling(control, 'sibling')).toBeNull();
	});

	it('should return the sibling control by index in a FormArray', () => {
		const sibling = new FormControl('sibling value');
		const control = new FormControl('control value');
		new FormArray([control, sibling]);
		expect(getSibling(control, 1)).toBe(sibling);
	});

	it('should return null if the sibling control index is out of bounds in a FormArray', () => {
		const control = new FormControl('control value');
		new FormArray([control]);
		expect(getSibling(control, 1)).toBeNull();
	});

	it('should throw an error if accessing FormArray sibling by -ve index', () => {
		const control = new FormControl('control value');
		new FormArray([control]);
		expect(() => getSibling(control, -1)).toThrowError(
			'FormArray sibling index must be a non-negative integer.'
		);
	});

	it('should throw an error if accessing FormArray sibling by name', () => {
		const control = new FormControl('control value');
		new FormArray([control]);
		expect(() => getSibling(control, 'sibling')).toThrowError(
			'FormArray sibling must be accessed by index.'
		);
	});

	it('should throw an error if accessing FormGroup sibling by index', () => {
		const control = new FormControl('control value');
		new FormGroup({
			control: control,
		});
		expect(() => getSibling(control, 0)).toThrowError(
			'FormControl sibling must be accessed by name.'
		);
	});
});
