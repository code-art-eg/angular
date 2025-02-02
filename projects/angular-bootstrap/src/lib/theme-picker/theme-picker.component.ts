import {
	Component,
	inject,
	Input,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { THEME_PROVIDER_TOKEN } from '../constants';
import type { PickerOption } from '../types';
import { PickerComponent } from '../picker/picker.component';

/**
 * ThemePickerComponent is a component that allows users to select a theme from a list of options.
 */
@Component({
	selector: 'bs-theme-picker',
	templateUrl: './theme-picker.component.html',
	imports: [PickerComponent],
})
export class ThemePickerComponent implements OnChanges {
	/**
	 * The theme provider used to manage the current theme.
	 */
	readonly themeProvider = inject(THEME_PROVIDER_TOKEN);

	/**
	 * Label for the light theme option.
	 */
	@Input() lightLabel = 'Light';
	/**
	 * Label for the dark theme option.
	 */
	@Input() darkLabel = 'Dark';
	/**
	 * Label for the auto theme option.
	 */
	@Input() autoLabel = 'Auto';

	options: PickerOption[] = this.#getPickerOptions();

	/**
	 * Handles changes to the input properties.
	 * @param changes The changes to the input properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		if (
			changes['lightLabel'] ||
			changes['darkLabel'] ||
			changes['autoLabel']
		) {
			this.options = this.#getPickerOptions();
		}
	}

	#getPickerOptions(): PickerOption[] {
		return [
			{
				icon: 'sun-fill',
				value: 'light',
				label: this.lightLabel,
			},
			{
				icon: 'moon-stars-fill',
				value: 'dark',
				label: this.darkLabel,
			},
			{
				icon: 'circle-half',
				value: null,
				label: this.autoLabel,
			},
		];
	}
}
