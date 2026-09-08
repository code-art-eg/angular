import { observableFromPromise } from './observable-from-promise';
import { firstValueFrom } from 'rxjs';

describe('observableFromPromise', () => {
	it('should convert a resolved promise to an observable', async () => {
		const promise = Promise.resolve('resolved value');
		const observable = observableFromPromise(promise);
		const value = await firstValueFrom(observable);
		expect(value).toBe('resolved value');
	});

	it('should convert a rejected promise to an observable that emits an error', async () => {
		const promise = Promise.reject('rejected value');
		const observable = observableFromPromise(promise);
		await expect(firstValueFrom(observable)).rejects.toBe('rejected value');
	});

	it('should handle promises that resolve to undefined', async () => {
		const promise = Promise.resolve(undefined);
		const observable = observableFromPromise(promise);
		const value = await firstValueFrom(observable);
		expect(value).toBeUndefined();
	});

	it('should handle promises that reject with undefined', async () => {
		const promise = Promise.reject(undefined);
		const observable = observableFromPromise(promise);
		await expect(firstValueFrom(observable)).rejects.toBeUndefined();
	});
});
