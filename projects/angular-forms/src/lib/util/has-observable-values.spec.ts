import { hasObservableValues } from './has-observable-values';
import { Observable } from 'rxjs';

describe('hasObservableValues', () => {
	it('should return false if params is an empty object', () => {
		const params = {};
		const result = hasObservableValues(params);
		expect(result).toBeFalse();
	});

	it('should return true if params has an observable property', () => {
		const params = { observableProp: new Observable() };
		const result = hasObservableValues(params);
		expect(result).toBeTrue();
	});

	it('should return false if params has no observable properties', () => {
		const params = { nonObservableProp: 'value' };
		const result = hasObservableValues(params);
		expect(result).toBeFalse();
	});

	it('should return true if params has multiple properties including an observable', () => {
		const params = {
			nonObservableProp: 'value',
			observableProp: new Observable(),
		};
		const result = hasObservableValues(params);
		expect(result).toBeTrue();
	});

	it('should return true if params has multiple properties including an parameterized message', () => {
		const params = {
			nonObservableProp: 'value',
			paramMessageProp: {
				messageKey: 'testKey',
				parameters: { name: 'world' },
				context: 'testContext',
			},
		};
		const result = hasObservableValues(params);
		expect(result).toBeTrue();
	});
});
