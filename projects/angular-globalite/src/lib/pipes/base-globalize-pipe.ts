import { ChangeDetectorRef, inject, Injectable } from '@angular/core';
import type { OnDestroy, PipeTransform } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { LocaleService } from '../services/locale.service';
import { AsyncPipe } from '@angular/common';

@Injectable()
export abstract class BaseGlobalizePipe<TInput, TOptions>
	implements OnDestroy, PipeTransform
{
	#innerPipe: AsyncPipe | null = null;
	#innerObservable?: Observable<string | null>;
	#cachedObservable?: Observable<TInput | null | undefined>;
	#cachedLocale?: string;
	#cachedOptions?: TOptions | string;

	protected readonly localeService = inject(LocaleService);
	protected readonly changeDetector = inject(ChangeDetectorRef);

	public ngOnDestroy(): void {
		this.#dispose();
	}

	public transform(
		input: null | undefined,
		format?: string,
		locale?: string
	): null;
	public transform(input: TInput, format?: string): string | null;
	public transform(input: TInput, format: string, locale: string): string;
	public transform(
		input: null | undefined,
		options?: TOptions,
		locale?: string
	): null;
	public transform(input: TInput, options?: TOptions): string | null;
	public transform(input: TInput, options: TOptions, locale: string): string;
	public transform(
		input: Observable<TInput | null | undefined>,
		options?: TOptions,
		locale?: string
	): string | null;
	public transform(
		input: Observable<TInput | null | undefined>,
		format?: string,
		locale?: string
	): string | null;

	public transform(
		input:
			| TInput
			| Observable<TInput | null | undefined>
			| null
			| undefined,
		optionsOrFormat?: TOptions | string,
		locale?: string
	): string | null {
		if (input === null || input === undefined) {
			this.#dispose();
			return null;
		}

		optionsOrFormat ??= this.getDefaultOptionsOrFormat();

		if (typeof locale === 'string') {
			if (!(input instanceof Observable)) {
				this.#dispose();
				return this.transformValue(input, optionsOrFormat, locale);
			}
		}
		if (
			this.#innerObservable &&
			this.#innerPipe &&
			this.#cachedObservable === input &&
			this.#cachedLocale === locale &&
			this.#cachedOptions === optionsOrFormat
		) {
			return this.#innerPipe.transform(this.#innerObservable);
		}

		this.#dispose();

		this.#cachedOptions = optionsOrFormat;
		if (typeof locale === 'string') {
			this.#cachedObservable = input as Observable<
				TInput | null | undefined
			>;
			this.#cachedLocale = locale;
			this.#innerObservable = this.#cachedObservable.pipe(
				map(value => {
					if (value === null || value === undefined) {
						return null;
					}
					return this.transformValue(value, optionsOrFormat, locale);
				})
			);
		} else if (input instanceof Observable) {
			this.#cachedObservable = input;
			this.#innerObservable = combineLatest([
				input,
				this.localeService.locale$,
			]).pipe(
				map(([value, locale]) => {
					if (value === null || value === undefined) {
						return null;
					}
					return this.transformValue(value, optionsOrFormat, locale);
				})
			);
		} else {
			this.#innerObservable = this.localeService.locale$.pipe(
				map(locale => {
					return this.transformValue(input, optionsOrFormat, locale);
				})
			);
		}

		this.#innerPipe = new AsyncPipe(this.changeDetector);
		return this.#innerPipe.transform(this.#innerObservable);
	}

	protected abstract transformValue(
		input: TInput,
		optionsFormat: TOptions | string,
		locale: string
	): string;
	protected abstract getDefaultOptionsOrFormat(): TOptions | string;

	#dispose(): void {
		if (this.#innerPipe) {
			this.#innerPipe.ngOnDestroy();
			this.#innerPipe = null;
		}

		this.#cachedObservable = undefined;
		this.#cachedLocale = undefined;
		this.#cachedOptions = undefined;
	}
}
