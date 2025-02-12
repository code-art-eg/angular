import { controlActionRecursive } from './control-action-recursive';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

describe('controlActionRecursive', () => {
	it('should perform action on all controls in a flat form group', () => {
		const formGroup = new FormGroup({
			control1: new FormControl(''),
			control2: new FormControl(''),
		});
		const action = jasmine.createSpy('action');

		controlActionRecursive(formGroup, action);

		expect(action).toHaveBeenCalledWith(formGroup.get('control1'));
		expect(action).toHaveBeenCalledWith(formGroup.get('control2'));
		expect(action).toHaveBeenCalledWith(formGroup);

		expect(action).toHaveBeenCalledTimes(3);
	});

	it('should perform action on all controls in a nested form group', () => {
		const formGroup = new FormGroup({
			control1: new FormControl(''),
			control2: new FormGroup({
				control3: new FormControl(''),
			}),
		});
		const action = jasmine.createSpy('action');

		controlActionRecursive(formGroup, action);

		expect(action).toHaveBeenCalledWith(formGroup.get('control1'));
		expect(action).toHaveBeenCalledWith(formGroup.get('control2'));
		expect(action).toHaveBeenCalledWith(formGroup.get('control2.control3'));
		expect(action).toHaveBeenCalledWith(formGroup);

		expect(action).toHaveBeenCalledTimes(4);
	});

	it('should perform action on all controls in a form array', () => {
		const formArray = new FormArray([
			new FormControl(''),
			new FormControl(''),
		]);
		const action = jasmine.createSpy('action');

		controlActionRecursive(formArray, action);

		expect(action).toHaveBeenCalledWith(formArray.at(1));
		expect(action).toHaveBeenCalledWith(formArray.at(0));
		expect(action).toHaveBeenCalledWith(formArray);

		expect(action).toHaveBeenCalledTimes(3);
	});

	it('should perform action on all controls in a nested form array', () => {
		const formArray = new FormArray([
			new FormControl(''),
			new FormGroup({
				control1: new FormControl(''),
			}),
		]);
		const action = jasmine.createSpy('action');

		controlActionRecursive(formArray, action);

		expect(action).toHaveBeenCalledWith(formArray.at(0));
		expect(action).toHaveBeenCalledWith(formArray.at(1));
		expect(action).toHaveBeenCalledWith(
			(formArray.at(1) as FormGroup).get('control1')
		);
		expect(action).toHaveBeenCalledWith(formArray);

		expect(action).toHaveBeenCalledTimes(4);
	});
});
