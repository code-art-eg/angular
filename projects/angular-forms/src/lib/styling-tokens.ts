import { InjectionToken } from '@angular/core';
import { ControlStyleOptions } from './types';
import { DEFAULT_CONTROL_STYLE_OPTIONS } from './styling-constants';

export const FORM_STYLE_INJECTION_TOKEN =
	new InjectionToken<ControlStyleOptions>('defaultFormStyle', {
		factory: () => DEFAULT_CONTROL_STYLE_OPTIONS,
		providedIn: 'root',
	});
