import { inject, Injectable } from '@angular/core';
import { MESSAGE_PROVIDERS_INJECTION_TOKEN } from '../message-provider-token';
import { combineLatest, from, isObservable, map, Observable } from 'rxjs';
import type { MessageResult, ParameterizedMessage } from '../types';
import {
	getLocaleParts,
	LocaleValidatorService,
	normalizeLocaleName,
} from '@code-art-eg/angular-globalite';
import { sentenceCase } from 'change-case';
import { isParameterizedMessage } from '../util/is-parameterized-message';
import { hasObservableValues } from '../util/has-observable-values';
import { formatString } from '@code-art-eg/globalite';
import { messageHasParameters } from '../util/message-has-parameters';

@Injectable({
	providedIn: 'root',
})
export class MessageService {
	#messageProviders = inject(MESSAGE_PROVIDERS_INJECTION_TOKEN);
	#languageToTryMap = new Map<string, string[]>();
	#localeValidator = inject(LocaleValidatorService);

	getFormatedMessage(
		language: string,
		msg: ParameterizedMessage
	): Observable<string> {
		if (msg.parameters === false) {
			return from([msg.messageKey]);
		}
		const messageResult = this.getMessage(
			language,
			msg.context,
			msg.messageKey
		);

		if (!messageHasParameters(msg)) {
			return messageResult.pipe(
				map(result => {
					return result.message;
				})
			);
		}

		if (!hasObservableValues(msg.parameters!)) {
			return messageResult.pipe(
				map(r => formatString(r.language, r.message, msg.parameters))
			);
		}

		const params$ = this.#toSingleObservable(language, msg.parameters!);
		return combineLatest([messageResult, params$]).pipe(
			map(([r, params]) => formatString(r.language, r.message, params))
		);
	}

	getMessage(
		language: string,
		context: string,
		key: string
	): Observable<MessageResult> {
		const languagesToTry = this.#getLanguagesToTry(language);
		for (const lang of languagesToTry) {
			const message = this.#getMessage(lang, context, key);
			if (message) {
				return message;
			}
		}
		return from([
			{
				key,
				context,
				language: 'en',
				message: sentenceCase(key),
			},
		]);
	}

	#toSingleObservable(
		language: string,
		params: Record<string, unknown>
	): Observable<Record<string, unknown>> {
		const allKeys = Object.getOwnPropertyNames(params);
		const keys = allKeys.filter(
			key =>
				isParameterizedMessage(params[key]) || isObservable(params[key])
		);
		const obsAr = keys.map(key =>
			this.#toObservable(language, params[key])
		);
		return combineLatest(obsAr).pipe(
			map(ar => {
				const result: Record<string, unknown> = { ...params };
				ar.forEach((value, index) => {
					result[keys[index]] = value;
				});
				return result;
			})
		);
	}

	#toObservable(language: string, value: unknown): Observable<unknown> {
		if (isObservable(value)) {
			return value;
		}
		if (isParameterizedMessage(value)) {
			return this.getFormatedMessage(language, value);
		}
		// Should not happen
		throw new Error(
			'Unexpected value of type in MessageService.toObservable: ' +
				typeof value
		);
	}

	#getLanguagesToTry(language: string): string[] {
		const result = this.#languageToTryMap.get(language);
		if (result) {
			return result;
		}
		const languagesToTry: string[] = [];
		this.#addLanguage(language, languagesToTry);
		const supported = this.#localeValidator.getSupportedLocale(language);
		if (supported) {
			this.#addLanguage(supported, languagesToTry);
		}
		this.#addLanguage(
			this.#localeValidator.getDefaultLocale(),
			languagesToTry
		);
		this.#addLanguage('en', languagesToTry);

		this.#languageToTryMap.set(language, languagesToTry);
		return languagesToTry;
	}

	#addLanguage(language: string, languagesToTry: string[]) {
		const parts = getLocaleParts(language);
		language = normalizeLocaleName(language);

		if (languagesToTry.indexOf(language) === -1) {
			languagesToTry.push(language);
		}
		if (parts.region) {
			if (languagesToTry.indexOf(parts.region) === -1) {
				languagesToTry.push(parts.region);
			}
			languagesToTry.push(parts.language);
		}
	}

	#getMessage(
		language: string,
		context: string,
		key: string
	): Observable<MessageResult> | undefined {
		for (const provider of this.#messageProviders) {
			const message = provider.getMessage(language, context, key);
			if (message) {
				return message;
			}
		}
		return undefined;
	}
}
