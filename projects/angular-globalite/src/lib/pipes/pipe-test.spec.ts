import {
	ChangeDetectorRef,
	Injector,
	runInInjectionContext,
} from '@angular/core';
import { LocaleService } from '../services/locale.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { BaseGlobalizePipe } from './base-globalize-pipe';

type Formatter<TInput> = (value: TInput) => string;

type FormatterFactory<TInput, TOptions> = (
	locale: string,
	optionsOrFormat: TOptions | string
) => Formatter<TInput>;

export function generatePipeTest<
	TInput,
	TOptions,
	TClass extends BaseGlobalizePipe<TInput, TOptions>,
>(
	pipeClass: new () => TClass,
	defaultOptions: TOptions,
	defaultFormat: string,
	defaultValue: TInput,
	factory: FormatterFactory<TInput, TOptions>,
	secondValue: TInput
) {
	let locale$: BehaviorSubject<string>;

	let mockLocalizeService: LocaleService;

	let pipe: BaseGlobalizePipe<TInput, TOptions>;
	let mockCd: jasmine.SpyObj<ChangeDetectorRef>;

	beforeEach(() => {
		locale$ = new BehaviorSubject<string>('en');
		mockLocalizeService = {
			locale$: locale$,
			currentLocale: 'en',
		} as unknown as LocaleService;
		Object.defineProperty(mockLocalizeService, 'currentLocale', {
			get: () => locale$.value,
			set: (value: string) => locale$.next(value),
		});

		mockCd = jasmine.createSpyObj('ChangeDetectorRef', [
			'markForCheck',
			'detectChanges',
		]);
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ChangeDetectorRef,
					useValue: mockCd,
				},
				{ provide: LocaleService, useValue: mockLocalizeService },
			],
			imports: [pipeClass],
		});
		const injector = TestBed.inject(Injector);
		runInInjectionContext(injector, () => {
			pipe = new pipeClass();
		});
	});

	afterEach(() => {
		pipe.ngOnDestroy();
		locale$.complete();
	});

	it('create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('transforms null to null', () => {
		expect(pipe.transform(null)).toBeNull();
		expect(mockCd.markForCheck.calls.count()).toBe(0);
		expect(mockCd.detectChanges.calls.count()).toBe(0);
	});

	it('transforms undefined to null', () => {
		expect(pipe.transform(undefined)).toBeNull();
		expect(mockCd.markForCheck.calls.count()).toBe(0);
		expect(mockCd.detectChanges.calls.count()).toBe(0);
	});

	it('transforms null to null with locale', () => {
		expect(pipe.transform(null, undefined, 'en')).toBe(null);
		expect(mockCd.markForCheck.calls.count()).toBe(0);
		expect(mockCd.detectChanges.calls.count()).toBe(0);
	});

	it('transforms undefined to null with locale', () => {
		expect(pipe.transform(null, undefined, 'en')).toBe(null);
		expect(mockCd.markForCheck.calls.count()).toBe(0);
		expect(mockCd.detectChanges.calls.count()).toBe(0);
	});

	it('transforms null to null with options', () => {
		expect(pipe.transform(null, defaultOptions, 'en')).toBe(null);
		expect(mockCd.markForCheck.calls.count()).toBe(0);
		expect(mockCd.detectChanges.calls.count()).toBe(0);
	});

	it('transforms undefined to null with options', () => {
		expect(pipe.transform(undefined, defaultOptions, 'en')).toBe(null);
		expect(mockCd.markForCheck.calls.count()).toBe(0);
		expect(mockCd.detectChanges.calls.count()).toBe(0);
	});

	it('transforms null to null with options', () => {
		expect(pipe.transform(null, defaultFormat, 'en')).toBe(null);
		expect(mockCd.markForCheck.calls.count()).toBe(0);
		expect(mockCd.detectChanges.calls.count()).toBe(0);
	});

	it('transforms undefined to null with options', () => {
		expect(pipe.transform(undefined, defaultFormat, 'en')).toBe(null);
		expect(mockCd.markForCheck.calls.count()).toBe(0);
		expect(mockCd.detectChanges.calls.count()).toBe(0);
	});

	it('transforms a value to a string with default format and culture', () => {
		expect(pipe.transform(defaultValue, defaultFormat, 'de')).toBe(
			factory('de', defaultFormat)(defaultValue)
		);
		expect(mockCd.markForCheck.calls.count()).toBe(0);
		expect(mockCd.detectChanges.calls.count()).toBe(0);
	});

	it('transforms a value to a string with default options and culture', () => {
		expect(pipe.transform(defaultValue, defaultOptions, 'de')).toBe(
			factory('de', defaultOptions)(defaultValue)
		);
		expect(mockCd.markForCheck.calls.count()).toBe(0);
		expect(mockCd.detectChanges.calls.count()).toBe(0);
	});

	it('transforms a value to a string with default options and default culture', () => {
		expect(pipe.transform(defaultValue, defaultOptions)).toBe(
			factory('en', defaultOptions)(defaultValue)
		);

		expect(mockCd.markForCheck.calls.count()).toBe(0);
		expect(mockCd.detectChanges.calls.count()).toBe(0);

		mockLocalizeService.currentLocale = 'ar-EG';

		expect(pipe.transform(defaultValue, defaultOptions)).toBe(
			factory('ar-EG', defaultOptions)(defaultValue)
		);
		expect(mockCd.markForCheck.calls.count()).toBe(1);
		expect(mockCd.detectChanges.calls.count()).toBe(0);
	});

	it('transforms a value to a string with default format and default culture', () => {
		expect(pipe.transform(defaultValue, defaultFormat)).toBe(
			factory('en', defaultFormat)(defaultValue)
		);
		expect(mockCd.markForCheck.calls.count()).toBe(0);
		expect(mockCd.detectChanges.calls.count()).toBe(0);

		mockLocalizeService.currentLocale = 'ar-EG';

		expect(pipe.transform(defaultValue, defaultFormat)).toBe(
			factory('ar-EG', defaultFormat)(defaultValue)
		);
		expect(mockCd.markForCheck.calls.count()).toBe(1);
		expect(mockCd.detectChanges.calls.count()).toBe(0);
	});

	it('transforms an Observable to a string with default format and default culture', () => {
		const subject = new Subject<TInput>();

		expect(pipe.transform(subject, defaultFormat)).toBeNull();
		expect(mockCd.markForCheck.calls.count()).toBe(0);
		expect(mockCd.detectChanges.calls.count()).toBe(0);

		subject.next(defaultValue);

		expect(pipe.transform(subject, defaultFormat)).toBe(
			factory('en', defaultOptions)(defaultValue)
		);

		expect(mockCd.markForCheck.calls.count()).toBe(1);
		expect(mockCd.detectChanges.calls.count()).toBe(0);

		mockLocalizeService.currentLocale = 'ar-EG';

		expect(pipe.transform(subject, defaultFormat)).toBe(
			factory('ar-EG', defaultFormat)(defaultValue)
		);

		expect(mockCd.markForCheck.calls.count()).toBe(2);
		expect(mockCd.detectChanges.calls.count()).toBe(0);

		subject.next(secondValue);

		expect(pipe.transform(subject, defaultFormat)).toBe(
			factory('ar-EG', defaultFormat)(secondValue)
		);

		expect(mockCd.markForCheck.calls.count()).toBe(3);
		expect(mockCd.detectChanges.calls.count()).toBe(0);

		mockLocalizeService.currentLocale = 'en';

		expect(pipe.transform(subject, defaultFormat)).toBe(
			factory('en', defaultFormat)(secondValue)
		);

		expect(mockCd.markForCheck.calls.count()).toBe(4);
		expect(mockCd.detectChanges.calls.count()).toBe(0);

		subject.complete();
	});
}
