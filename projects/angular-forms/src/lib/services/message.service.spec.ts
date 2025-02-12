import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { MessageCollection } from '../types';
import { MESSAGES_INJECTION_TOKEN } from '../messages-token';
import {
	FORM_FIELD_CONTEXT,
	FORM_VALIDATION_CONTEXT,
	NO_CONTEXT,
} from '../constants';
import { SUPPORTED_LOCALES_TOKEN } from '@code-art-eg/angular-globalite';
import { Subject } from 'rxjs';

const enFields: MessageCollection = {
	messages: {
		key1: 'KEY1 EN',
		key2: 'KEY2 EN',
	},
	language: 'en',
	context: FORM_FIELD_CONTEXT,
};

const deFields: MessageCollection = {
	messages: {
		key1: 'KEY1 DE',
		key2: 'KEY2 DE',
	},
	language: 'de',
	context: FORM_FIELD_CONTEXT,
};

const enValidation: MessageCollection = {
	messages: {
		msg1: 'MSG1 EN {key}',
		msg2: 'MSG2 EN {key} {otherKey}',
	},
	language: 'en',
	context: FORM_VALIDATION_CONTEXT,
};

const deValidation: MessageCollection = {
	messages: {
		msg1: 'MSG1 DE {key}',
		msg2: 'MSG2 DE {key} {otherKey}',
	},
	language: 'de',
	context: FORM_VALIDATION_CONTEXT,
};

const testMessages = [enFields, deFields, enValidation, deValidation];

describe('MessageService', () => {
	let service: MessageService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: MESSAGES_INJECTION_TOKEN,
					useValue: testMessages,
				},
				{
					provide: SUPPORTED_LOCALES_TOKEN,
					useValue: ['en', 'de'],
				},
			],
		});
		service = TestBed.inject(MessageService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getMessage', () => {
		it('should return the english field for the key1', () => {
			const result$ = service.getMessage(
				'en',
				FORM_FIELD_CONTEXT,
				'key1'
			);
			result$.subscribe(message => {
				expect(message).toEqual({
					language: 'en',
					key: 'key1',
					message: 'KEY1 EN',
					context: FORM_FIELD_CONTEXT,
				});
			});
		});

		it('should return the arabic field for the key1 return english', () => {
			const result$ = service.getMessage(
				'ar',
				FORM_FIELD_CONTEXT,
				'key1'
			);
			result$.subscribe(message => {
				expect(message).toEqual({
					language: 'en',
					key: 'key1',
					message: 'KEY1 EN',
					context: FORM_FIELD_CONTEXT,
				});
			});
		});

		it('should return the sentence case when key not found', () => {
			const result$ = service.getMessage('en', NO_CONTEXT, 'keyNotFound');
			result$.subscribe(message => {
				expect(message).toEqual({
					language: 'en',
					key: 'keyNotFound',
					message: 'Key not found',
					context: NO_CONTEXT,
				});
			});
		});
	});

	describe('getFormatedMessage', () => {
		it('should return message verbatim when parameters is false', () => {
			const result$ = service.getFormatedMessage('en', {
				messageKey: 'key1',
				context: FORM_FIELD_CONTEXT,
				parameters: false,
			});
			result$.subscribe(message => {
				expect(message).toBe('key1');
			});
		});

		it('should return the english field for the key1', () => {
			const result$ = service.getFormatedMessage('en', {
				messageKey: 'key1',
				context: FORM_FIELD_CONTEXT,
			});
			result$.subscribe(message => {
				expect(message).toBe('KEY1 EN');
			});
		});

		it('should emit messages when there is an observable parameter', () => {
			const sub$ = new Subject<number>();
			const result$ = service.getFormatedMessage('en', {
				messageKey: 'msg1',
				context: FORM_VALIDATION_CONTEXT,
				parameters: {
					key: sub$,
				},
			});
			const messages: string[] = [];
			result$.subscribe(message => {
				messages.push(message);
			});

			sub$.next(1);
			sub$.next(2);

			sub$.complete();
			expect(messages).toEqual(['MSG1 EN 1', 'MSG1 EN 2']);
		});

		it('should return the english field for the key2', () => {
			const result$ = service.getFormatedMessage('en', {
				messageKey: 'key2',
				context: FORM_FIELD_CONTEXT,
			});
			result$.subscribe(message => {
				expect(message).toBe('KEY2 EN');
			});
		});

		it('should return the german field for the key1', () => {
			const result$ = service.getFormatedMessage('de', {
				messageKey: 'key1',
				context: FORM_FIELD_CONTEXT,
			});
			result$.subscribe(message => {
				expect(message).toBe('KEY1 DE');
			});
		});

		it('should return the german field for the key2', () => {
			const result$ = service.getFormatedMessage('de', {
				messageKey: 'key2',
				context: FORM_FIELD_CONTEXT,
			});
			result$.subscribe(message => {
				expect(message).toBe('KEY2 DE');
			});
		});

		it('should return the english validation message for the msg1', () => {
			const result$ = service.getFormatedMessage('en', {
				messageKey: 'msg1',
				context: FORM_VALIDATION_CONTEXT,
				parameters: {
					key: {
						messageKey: 'key1',
						context: FORM_FIELD_CONTEXT,
					},
				},
			});
			result$.subscribe(message => {
				expect(message).toBe('MSG1 EN KEY1 EN');
			});
		});

		it('should return the german validation message for the msg1', () => {
			const result$ = service.getFormatedMessage('de', {
				messageKey: 'msg1',
				context: FORM_VALIDATION_CONTEXT,
				parameters: {
					key: {
						messageKey: 'key1',
						context: FORM_FIELD_CONTEXT,
					},
				},
			});
			result$.subscribe(message => {
				expect(message).toBe('MSG1 DE KEY1 DE');
			});
		});

		it('should return the english validation message for the msg2', () => {
			const result$ = service.getFormatedMessage('en', {
				messageKey: 'msg2',
				context: FORM_VALIDATION_CONTEXT,
				parameters: {
					key: {
						messageKey: 'key1',
						context: FORM_FIELD_CONTEXT,
					},
					otherKey: {
						messageKey: 'key2',
						context: FORM_FIELD_CONTEXT,
					},
				},
			});
			result$.subscribe(message => {
				expect(message).toBe('MSG2 EN KEY1 EN KEY2 EN');
			});
		});

		it('should return the german validation message for the msg2', () => {
			const result$ = service.getFormatedMessage('de', {
				messageKey: 'msg2',
				context: FORM_VALIDATION_CONTEXT,
				parameters: {
					key: {
						messageKey: 'key1',
						context: FORM_FIELD_CONTEXT,
					},
					otherKey: {
						messageKey: 'key2',
						context: FORM_FIELD_CONTEXT,
					},
				},
			});
			result$.subscribe(message => {
				expect(message).toBe('MSG2 DE KEY1 DE KEY2 DE');
			});
		});

		it('should return the english validation message for the msg2 when arabic is requested', () => {
			const result$ = service.getFormatedMessage('ar', {
				messageKey: 'msg2',
				context: FORM_VALIDATION_CONTEXT,
				parameters: {
					key: {
						messageKey: 'key1',
						context: FORM_FIELD_CONTEXT,
					},
					otherKey: {
						messageKey: 'key2',
						context: FORM_FIELD_CONTEXT,
					},
				},
			});
			result$.subscribe(message => {
				expect(message).toBe('MSG2 EN KEY1 EN KEY2 EN');
			});
		});
	});
});
