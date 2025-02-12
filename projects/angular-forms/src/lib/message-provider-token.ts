import { inject, InjectionToken } from '@angular/core';
import type { MessageProvider } from './types';
import { DefaultMessageProviderService } from './services/default-message-provider.service';

export const MESSAGE_PROVIDERS_INJECTION_TOKEN = new InjectionToken<
	MessageProvider[]
>('messageProviders', {
	providedIn: 'root',
	factory: () => [inject(DefaultMessageProviderService)],
});
