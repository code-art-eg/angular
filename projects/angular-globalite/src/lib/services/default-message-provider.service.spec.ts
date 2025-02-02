import { TestBed } from '@angular/core/testing';
import { DefaultMessageProviderService } from './default-message-provider.service';
import { MessageCollection, MessageProvider } from '../types';
import { MESSAGES_INJECTION_TOKEN } from '../messages-token';
import { first } from 'rxjs';
import { FORM_VALIDATION_CONTEXT, NO_CONTEXT } from '../constants';

describe('DefaultMessageProviderService', () => {
	let service: DefaultMessageProviderService;
	const messages: MessageCollection[] = [
		{
			language: 'en',
			messages: { testKey: 'Default English message for testKey' },
			context: FORM_VALIDATION_CONTEXT,
		},
		{
			language: 'de',
			messages: { testKey: 'Default German message for testKey' },
			context: FORM_VALIDATION_CONTEXT,
		},
		{
			language: 'en',
			messages: { key2: 'Default English message for key2' },
			context: FORM_VALIDATION_CONTEXT,
		},
		{
			language: 'de',
			messages: { key2: 'Default German message for key2' },
			context: FORM_VALIDATION_CONTEXT,
		},
	];

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: MESSAGES_INJECTION_TOKEN,
					useValue: messages,
				},
			],
		});
		service = TestBed.inject(DefaultMessageProviderService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should return the english message for the testKey', () =>
		service
			.getMessage('en', FORM_VALIDATION_CONTEXT, 'testKey')
			.pipe(first())
			.subscribe(result => {
				expect(result).toEqual({
					key: 'testKey',
					language: 'en',
					message: 'Default English message for testKey',
					context: FORM_VALIDATION_CONTEXT,
					editable: false,
					provider: service,
				});
			}));
	it('should return the german message for the testKey', () =>
		service
			.getMessage('de', FORM_VALIDATION_CONTEXT, 'testKey')
			.pipe(first())
			.subscribe(result => {
				expect(result).toEqual({
					key: 'testKey',
					language: 'de',
					message: 'Default German message for testKey',
					context: FORM_VALIDATION_CONTEXT,
					editable: false,
					provider: service,
				});
			}));

	it('should return the null for french message for the testKey', () =>
		service
			.getMessage('fr', FORM_VALIDATION_CONTEXT, 'testKey')
			.pipe(first())
			.subscribe(result => {
				expect(result).toBeNull();
			}));

	it('should return the null for english message for the testKey with wrong context', () =>
		service
			.getMessage('fr', NO_CONTEXT, 'testKey')
			.pipe(first())
			.subscribe(result => {
				expect(result).toBeNull();
			}));

	it('should return the null for english message for the wrongKey', () =>
		service
			.getMessage('en', FORM_VALIDATION_CONTEXT, 'wrongKey')
			.pipe(first())
			.subscribe(result => {
				expect(result).toBeNull();
			}));

	it('should return false for supportsEditing', () => {
		expect(service.supportsEditing).toBeFalse();
	});

	it('should throw an error for setMessage', () => {
		expect(() =>
			(service as MessageProvider).setMessage(
				'en',
				FORM_VALIDATION_CONTEXT,
				'testKey',
				'new message'
			)
		).toThrow();
	});
});
