import { isObservable } from 'rxjs';
import { isParameterizedMessage } from './is-parameterized-message';

export function hasObservableValues(params: Record<string, unknown>): boolean {
	return Object.getOwnPropertyNames(params).some(
		key => isObservable(params[key]) || isParameterizedMessage(params[key])
	);
}
