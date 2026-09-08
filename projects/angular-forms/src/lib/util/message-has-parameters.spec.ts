import { messageHasParameters } from './message-has-parameters';

describe('messageHasParameters', () => {
	it('should return false if msg.parameters is undefined', () => {
		const msg = { messageKey: '', context: '', parameters: undefined };
		const result = messageHasParameters(msg);
		expect(result).toBe(false);
	});

	it('should return false if msg.parameters is not an object', () => {
		const msg = {
			messageKey: '',
			context: '',
			parameters: undefined,
		};
		const result = messageHasParameters(msg);
		expect(result).toBe(false);
	});

	it('should return false if msg.parameters is an empty object', () => {
		const msg = {
			messageKey: '',
			context: '',
			parameters: {},
		};
		const result = messageHasParameters(msg);
		expect(result).toBe(false);
	});

	it('should return true if msg.parameters has properties', () => {
		const msg = {
			messageKey: '',
			context: '',
			parameters: { name: 'John' },
		};
		const result = messageHasParameters(msg);
		expect(result).toBe(true);
	});

	it('should return true if msg.parameters has multiple properties', () => {
		const msg = {
			messageKey: '',
			context: '',
			parameters: { firstName: 'John', lastName: 'Doe' },
		};
		const result = messageHasParameters(msg);
		expect(result).toBe(true);
	});
});
