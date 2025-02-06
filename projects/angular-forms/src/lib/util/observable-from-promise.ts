import { Observable } from 'rxjs';

/**
 * Converts a promise to an observable.
 *
 * @param {Promise<T>} promise - The promise to convert.
 * @returns {Observable<T>} The observable.
 * @template T - The type of the promise value.
 */
export function observableFromPromise<T>(promise: Promise<T>): Observable<T> {
	return new Observable<T>(observer => {
		promise.then(
			value => {
				observer.next(value);
				observer.complete();
			},
			err => observer.error(err)
		);
	});
}
