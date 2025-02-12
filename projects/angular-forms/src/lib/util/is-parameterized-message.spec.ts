import { isParameterizedMessage } from './is-parameterized-message';

describe('isParameterizedMessage', () => {
	it('should return false for a string with message parameters', () => {
		const message = 'Hello, {name}!';
		const result = isParameterizedMessage(message);
		expect(result).toBeFalse();
	});

	it('should return false for a string', () => {
		const message = 'Hello, world!';
		const result = isParameterizedMessage(message);
		expect(result).toBeFalse();
	});

	it('should return false for an empty object', () => {
		const message = {};
		const result = isParameterizedMessage(message);
		expect(result).toBeFalse();
	});

	it('should return false for a null value', () => {
		const message = null;
		const result = isParameterizedMessage(message);
		expect(result).toBeFalse();
	});

	it('should return true for a valid object', () => {
		const message = {
			messageKey: 'testKey',
			parameters: { name: 'world' },
			context: 'testContext',
		};
		const result = isParameterizedMessage(message);
		expect(result).toBeTrue();
	});

	it('should return true for a valid object without parameters', () => {
		const message = {
			messageKey: 'testKey',
			context: 'testContext',
		};
		const result = isParameterizedMessage(message);
		expect(result).toBeTrue();
	});

	it('should return true for a valid object when parameters is false', () => {
		const message = {
			messageKey: 'testKey',
			context: 'testContext',
			parameters: false,
		};
		const result = isParameterizedMessage(message);
		expect(result).toBeTrue();
	});

	it('should return false for a valid object when parameters is true', () => {
		const message = {
			messageKey: 'testKey',
			context: 'testContext',
			parameters: true,
		};
		const result = isParameterizedMessage(message);
		expect(result).toBeFalse();
	});

	it('should return false for a valid object without messageKey', () => {
		const message = {
			context: 'testContext',
			parameters: { name: 'world' },
		};
		const result = isParameterizedMessage(message);
		expect(result).toBeFalse();
	});

	it('should return false for a valid object without context', () => {
		const message = {
			messageKey: 'testKey',
			parameters: { name: 'world' },
		};
		const result = isParameterizedMessage(message);
		expect(result).toBeFalse();
	});

	it('should return false for an object with null parameters', () => {
		const message = {
			messageKey: 'testKey',
			context: 'testContext',
			parameters: null,
		};
		const result = isParameterizedMessage(message);
		expect(result).toBeFalse();
	});

	it('should return true for a an object with undefined parameters', () => {
		const message = {
			messageKey: 'testKey',
			context: 'testContext',
			parameters: undefined,
		};
		const result = isParameterizedMessage(message);
		expect(result).toBeTrue();
	});

	it('should return false for an object numeric parameters', () => {
		const message = {
			messageKey: 'testKey',
			context: 'testContext',
			parameters: 4,
		};
		const result = isParameterizedMessage(message);
		expect(result).toBeFalse();
	});

	it('should return true for an object with empty object parameters', () => {
		const message = {
			messageKey: 'testKey',
			context: 'testContext',
			parameters: {},
		};
		const result = isParameterizedMessage(message);
		expect(result).toBeTrue();
	});

	it('should return false with wrong messageKey type', () => {
		const message = {
			messageKey: 4,
			context: 'testContext',
			parameters: {},
		};
		const result = isParameterizedMessage(message);
		expect(result).toBeFalse();
	});

	it('should return false with wrong context type', () => {
		const message = {
			messageKey: '123',
			context: 4,
			parameters: {},
		};
		const result = isParameterizedMessage(message);
		expect(result).toBeFalse();
	});
});
