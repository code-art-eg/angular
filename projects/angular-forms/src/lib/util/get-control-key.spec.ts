import { getControlKey } from './get-control-key';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

describe('getControlKeys', () => {
	it('should null when control has no parent', () => {
		const ctl = new FormControl<string>('');
		const result = getControlKey(ctl);
		expect(result).toBeNull();
	});

	it('should key when parent is a form group', () => {
		const group = new FormGroup({
			key1: new FormControl<string>(''),
		});
		const ctl = group.controls.key1;
		const result = getControlKey(ctl);
		expect(result).toBe('key1');
	});

	it('should index when parent is a form array', () => {
		const ar = new FormArray([
			new FormControl<string>(''),
			new FormControl<string>(''),
			new FormControl<string>(''),
			new FormControl<string>(''),
		]);
		const ctl = ar.controls[2]!;
		const result = getControlKey(ctl);
		expect(result).toBe('2');
	});

	it('should return index with parent control key when parent is a form array with a parent group', () => {
		const group = new FormGroup({
			array1: new FormArray([
				new FormControl<string>(''),
				new FormControl<string>(''),
				new FormControl<string>(''),
				new FormControl<string>(''),
			]),
		});
		const ar = group.controls.array1 as FormArray;
		const ctl = ar.controls[2]!;
		const result = getControlKey(ctl);
		expect(result).toEqual('array1.2');
	});
});
