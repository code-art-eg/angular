import { DialogButton } from './types';

/**
 * Context use for translation of message when the message is a validation message.
 */
export const FORM_VALIDATION_CONTEXT = 'formValidation';
/**
 * Context use for translation of message when the message is a form field message.
 */
export const FORM_FIELD_CONTEXT = 'formField';
/**
 * Context use for translation of message when the message is no context.
 */
export const NO_CONTEXT = 'NoContext';

const CLOSE_ACTION = 'close';
export const CLOSE_BUTTON = {
	id: CLOSE_ACTION,
	text: 'Close',
	buttonType: 'secondary',
	close: true,
} satisfies DialogButton;

export const DEFAULT_BUTTONS = [CLOSE_BUTTON];
