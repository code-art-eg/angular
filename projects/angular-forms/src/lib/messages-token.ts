import { InjectionToken } from '@angular/core';
import type { MessageCollection } from './types';
import { DEFAULT_VALIDATION_MESSAGES } from './validation-messages-en';

/**
 * Injection token for messages (form field and validation messages).
 */
export const MESSAGES_INJECTION_TOKEN = new InjectionToken<MessageCollection[]>(
	'messages',
	{
		providedIn: 'root',
		factory: () => [DEFAULT_VALIDATION_MESSAGES],
	}
);
