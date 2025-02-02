import { isPromise } from './is-promise';

describe('isPromise', () => {
	it('should return true for a Promise', () => {
		const promise = new Promise(resolve => resolve(true));
		expect(isPromise(promise)).toBe(true);
	});

	it('should return false for a non-Promise object', () => {
		const obj = {};
		expect(isPromise(obj)).toBe(false);
	});

	it('should return false for a string', () => {
		const str = 'not a promise';
		expect(isPromise(str)).toBe(false);
	});

	it('should return false for a number', () => {
		const num = 42;
		expect(isPromise(num)).toBe(false);
	});

	it('should return false for null', () => {
		expect(isPromise(null)).toBe(false);
	});

	it('should return false for undefined', () => {
		expect(isPromise(undefined)).toBe(false);
	});

	it('should return false for a function', () => {
		const func = () => {
			return;
		};
		expect(isPromise(func)).toBe(false);
	});

	it('should return true for a function with then', () => {
		const func = () => {
			return;
		};
		func.then = () => {
			return;
		};
		expect(isPromise(func)).toBe(true);
	});
});
