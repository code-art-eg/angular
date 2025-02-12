import { ParameterizedMessage } from '../types';

export function isParameterizedMessage(
	msg: unknown
): msg is ParameterizedMessage {
	return (
		typeof msg === 'object' &&
		msg !== null &&
		'messageKey' in msg &&
		typeof msg.messageKey === 'string' &&
		(!('parameters' in msg) ||
			msg.parameters === false ||
			(typeof msg.parameters === 'object' && msg.parameters !== null) ||
			typeof msg.parameters === 'undefined') &&
		'context' in msg &&
		typeof msg.context === 'string'
	);
}
