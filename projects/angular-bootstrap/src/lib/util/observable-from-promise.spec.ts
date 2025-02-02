import { observableFromPromise } from './observable-from-promise';

describe('observableFromPromise', () => {
	it('should convert a resolved promise to an observable', done => {
		const promise = Promise.resolve('resolved value');
		const observable = observableFromPromise(promise);

		observable.subscribe({
			next: value => {
				expect(value).toBe('resolved value');
				done();
			},
			error: done.fail,
		});
	});

	it('should convert a rejected promise to an observable that emits an error', done => {
		const promise = Promise.reject('rejected value');
		const observable = observableFromPromise(promise);

		observable.subscribe({
			next: () => done.fail('Expected an error, but got a value'),
			error: error => {
				expect(error).toBe('rejected value');
				done();
			},
		});
	});

	it('should handle promises that resolve to undefined', done => {
		const promise = Promise.resolve(undefined);
		const observable = observableFromPromise(promise);

		observable.subscribe({
			next: value => {
				expect(value).toBeUndefined();
				done();
			},
			error: done.fail,
		});
	});

	it('should handle promises that reject with undefined', done => {
		const promise = Promise.reject(undefined);
		const observable = observableFromPromise(promise);

		observable.subscribe({
			next: () => done.fail('Expected an error, but got a value'),
			error: error => {
				expect(error).toBeUndefined();
				done();
			},
		});
	});
});
