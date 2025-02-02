import { InjectionToken } from '@angular/core';
import { MessageProvider } from './types';

export const MESSAGE_PROVIDERS_INJECTION_TOKEN = new InjectionToken<
	MessageProvider[]
>('messageProviders', {
	providedIn: 'root',
	factory: () => [],
});
