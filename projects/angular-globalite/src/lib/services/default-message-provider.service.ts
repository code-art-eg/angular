import { inject, Injectable } from '@angular/core';
import { MessageProvider, MessageResult } from '../types';
import { MESSAGES_INJECTION_TOKEN } from '../messages-token';
import { from, Observable } from 'rxjs';

/**
 * Default message provider.
 * Provides messages from the injected messages collections.
 * Does not support editing messages.
 */
@Injectable({
	providedIn: 'root',
})
export class DefaultMessageProviderService implements MessageProvider {
	readonly #messages = new Map<string, Observable<MessageResult>>();
	readonly supportsEditing = false;
	#injectedMessages = inject(MESSAGES_INJECTION_TOKEN);
	readonly #nullMessage: Observable<MessageResult | null> = from([null]);

	constructor() {
		this.#injectedMessages.forEach(collection => {
			const keys = Object.getOwnPropertyNames(collection.messages);
			keys.forEach(key => {
				if (!Object.hasOwn(collection.messages, key)) {
					return;
				}
				const cacheKey = `${collection.language}/${collection.context}/${key}`;
				const mstResult: MessageResult = {
					key: key,
					context: collection.context,
					language: collection.language,
					message: collection.messages[key],
					editable: false,
					provider: this,
				};
				this.#messages.set(cacheKey, from([mstResult]));
			});
		});
	}

	getMessage(
		language: string,
		context: string,
		key: string
	): Observable<MessageResult | null> {
		const cacheKey = `${language}/${context}/${key}`;
		return this.#messages.get(cacheKey) ?? this.#nullMessage;
	}

	setMessage(): Observable<MessageResult> {
		throw new Error('Setting messages is not supported by this provider.');
	}
}
