import { InjectionToken } from '@angular/core';
import type { MessageProvider } from './types';

export const MESSAGE_PROVIDERS_INJECTION_TOKEN = new InjectionToken<
	MessageProvider[]
>('messageProviders', {
	providedIn: 'root',
	factory: () => [],
});
