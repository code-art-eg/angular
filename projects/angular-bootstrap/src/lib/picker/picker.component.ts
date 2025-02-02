import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { PickerOption } from '../types';

/**
 * A button in the picker.
 */
export interface Button {
	/**
	 * The id of the button.
	 */
	id: number;
	/**
	 * The label of the button.
	 */
	label: string;
	/**
	 * The icon of the button. Using Bootstrap icons package.
	 */
	icon?: string;
	/**
	 * The value of the button.
	 */
	value: unknown;

	/**
	 * Whether the button is active.
	 */
	active: boolean;
}

/**
 * Gets the current value of the picker.
 * @returns The current value.
 */
@Component({
	selector: 'bs-picker',
	imports: [],
	templateUrl: './picker.component.html',
	styleUrl: './picker.component.scss',
})
export class PickerComponent {
	show = false;

	/**
	 * The buttons to display in the picker.
	 */
	buttons: Button[] = [];
	#value: unknown;

	/**
	 * Sets the current value of the picker and updates the active button.
	 * @param newVal The new value to set.
	 */
	@Input() set value(newVal: unknown) {
		this.show = false;
		if (this.#value === newVal) {
			return;
		}
		this.#value = newVal;
		let valueFound = false;
		this.buttons.forEach(button => {
			if (button.value === newVal && !valueFound) {
				valueFound = true;
				button.active = true;
			} else {
				button.active = false;
			}
		});

		this.valueChange.emit(newVal);
	}

	/**
	 * Gets the current value of the picker.
	 * @returns The current value.
	 */
	get value(): unknown {
		return this.#value;
	}

	/**
	 * Event emitter that emits the new value when the picker value changes.
	 */
	@Output() valueChange = new EventEmitter<unknown>();

	/**
	 * The icon to display for the selection.
	 */
	@Input() selectionIcon: string | undefined;

	/**
	 * Sets the options for the picker and initializes the buttons.
	 * @param options The options to set.
	 */
	@Input() set selections(options: PickerOption[]) {
		let valueFound = false;
		this.buttons = options.map((option, index) => {
			let active = false;
			if (!valueFound && option.value === this.value) {
				valueFound = true;
				active = true;
			}
			return {
				id: index,
				label: option.label,
				icon: option.icon,
				value: option.value,
				active,
			};
		});

		if (!valueFound) {
			this.value = this.buttons[0].value;
		}
	}

	/**
	 * Gets the icon of the active button.
	 * @returns The icon of the active button, or the selection icon if no button is active.
	 */
	getActiveIcon(): string {
		return (
			this.buttons.find(button => button.active)?.icon ??
			this.selectionIcon ??
			''
		);
	}
}
