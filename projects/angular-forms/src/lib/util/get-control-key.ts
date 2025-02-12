import { AbstractControl, FormArray } from '@angular/forms';

export function getControlKey(ctl: AbstractControl): string | number | null {
	if (!ctl.parent) {
		return null;
	}
	if (ctl.parent instanceof FormArray) {
		const parentKey = getControlKey(ctl.parent);
		const index = ctl.parent.controls.indexOf(ctl);
		if (parentKey) {
			return `${parentKey}.${index}`;
		}
		return index;
	}
	for (const key of Object.getOwnPropertyNames(ctl.parent.controls)) {
		if (ctl.parent.controls[key] === ctl) {
			return key;
		}
	}
	return null;
}
