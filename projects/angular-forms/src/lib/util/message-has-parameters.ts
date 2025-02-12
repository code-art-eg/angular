import type { ParameterizedMessage } from '../types';

export function messageHasParameters(msg: ParameterizedMessage): boolean {
	if (!msg.parameters) {
		return false;
	}
	if (typeof msg.parameters !== 'object') {
		return false;
	}
	const keys = Object.getOwnPropertyNames(msg.parameters);
	return keys.length > 0;
}
