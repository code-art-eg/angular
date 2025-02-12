import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export function controlActionRecursive(
	control: AbstractControl,
	action: (control: AbstractControl) => void
): void {
	action(control);
	if (control instanceof FormArray) {
		control.controls.forEach(c => controlActionRecursive(c, action));
	} else if (control instanceof FormGroup) {
		Object.getOwnPropertyNames(control.controls).forEach(name =>
			controlActionRecursive(control.controls[name], action)
		);
	}
}
