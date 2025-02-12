/*
 * Public API Surface of angular-forms
 */

export * from './lib/validators';
export { PopupService } from './lib/services/popup.service';

export type {
	MessageProvider,
	MessageCollection,
	ParameterizedMessage,
	ControlStyleOptions,
	MessageResult,
} from './lib/types';
export { MESSAGES_INJECTION_TOKEN } from './lib/messages-token';
export { MESSAGE_PROVIDERS_INJECTION_TOKEN } from './lib/message-provider-token';

export * from './lib/styling-constants';
export { FORM_STYLE_INJECTION_TOKEN } from './lib/styling-tokens';

export * from './lib/components/validation-errors/validation-errors.component';
export * from './lib/directives/parameterized-message.directive';
