import {
	DestroyRef,
	Directive,
	inject,
	Injector,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CoercedValue, ControlValue, OnChangeHandler } from '../types';
import { LocaleService } from '../services/locale.service';

/**
 * Abstract base class for directives that convert and format values.
 * Implements ControlValueAccessor to integrate with Angular forms.
 *
 * @template T The type of the value being converted and formatted.
 */
@Directive()
export abstract class BaseConverterDirective<T>
	implements OnDestroy, OnInit, ControlValueAccessor
{
	#controlValueAccessor: ControlValueAccessor | undefined;
	#onchange: OnChangeHandler<T>[] = [];
	#onTouch: (() => void)[] = [];
	#controlValue: ControlValue<T> = null;
	#disabled = false;
	#valueSubject = new BehaviorSubject<ControlValue<T>>(null);

	protected readonly injector = inject(Injector);
	protected readonly localeService = inject(LocaleService);
	#destroyRef = inject(DestroyRef);

	/**
	 * @inheritDoc
	 */
	writeValue(val: ControlValue<T>): void {
		this.value = val;
	}

	/**
	 * @inheritDoc
	 */
	get value(): ControlValue<T> {
		return this.#valueSubject.value;
	}

	/**
	 * @inheritDoc
	 */
	set value(val: ControlValue<T>) {
		if (typeof val === 'string') {
			if (val === this.value) {
				return;
			}
		} else if (
			typeof this.value !== 'string' &&
			this.#valuesAreEqual(val, this.value)
		) {
			return;
		}
		this.#valueSubject.next(val);
		this.raiseOnChange(val);
	}

	/**
	 * @inheritDoc
	 */
	ngOnDestroy(): void {
		this.#setAccessor(undefined);
		this.#valueSubject.complete();
	}

	/**
	 * @inheritDoc
	 */
	public registerOnChange(fn: unknown): void {
		if (typeof fn === 'function') {
			this.#onchange.push(fn as OnChangeHandler<T>);
		}
	}

	/**
	 * @inheritDoc
	 */
	public registerOnTouched(fn: unknown): void {
		if (typeof fn === 'function') {
			this.#onTouch.push(fn as () => void);
		}
	}

	/**
	 * @inheritDoc
	 */
	public setDisabledState(isDisabled: boolean): void {
		this.#disabled = isDisabled;
		if (this.#controlValueAccessor) {
			if (
				typeof this.#controlValueAccessor.setDisabledState ===
				'function'
			) {
				this.#controlValueAccessor.setDisabledState(this.#disabled);
			}
		}
	}

	/**
	 * @inheritDoc
	 */
	public ngOnInit(): void {
		this.#selectAccessor();
	}

	/**
	 * Raises the change event.
	 * @param val The new value.
	 * @private
	 */
	private raiseOnChange(val: ControlValue<T>): void {
		for (const fn of this.#onchange) {
			fn(val);
		}
	}

	/**
	 * Raises the touched event.
	 * @private
	 */
	private raiseOnTouched(): void {
		for (const fn of this.#onTouch) {
			fn();
		}
	}

	/**
	 * Sets the control value accessor.
	 * @param accessor The control value accessor to set.
	 * @private
	 */
	#setAccessor(accessor: ControlValueAccessor | undefined): void {
		if (this.#controlValueAccessor === accessor) {
			return;
		}
		this.#controlValueAccessor = accessor;
		if (accessor) {
			accessor.registerOnChange((v: ControlValue<T>) => {
				if (this.#controlValueAccessor !== accessor) {
					return;
				}
				this.#controlValue = v;
				const val = this.coerceValue(v);
				this.value = val !== undefined ? val : v;
			});
			accessor.registerOnTouched(() => {
				if (this.#controlValueAccessor !== accessor) {
					return;
				}
				this.raiseOnTouched();
			});
			if (typeof accessor.setDisabledState === 'function') {
				accessor.setDisabledState(this.#disabled);
			}
		}
	}

	/**
	 * Selects the control value accessor.
	 * @private
	 */
	#selectAccessor(): void {
		let accessors = this.injector.get<
			ControlValueAccessor | ControlValueAccessor[]
		>(NG_VALUE_ACCESSOR);
		if (accessors) {
			accessors = Array.isArray(accessors) ? accessors : [accessors];
			for (const accessor of accessors) {
				if (accessor !== this) {
					if (this.#controlValueAccessor) {
						throw new Error(
							`More than one control value accessor is provider.`
						);
					}
					this.#setAccessor(accessor);
				}
			}
		}

		combineLatest([this.localeService.locale$, this.#valueSubject])
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe(v => {
				if (!this.#controlValueAccessor) {
					return;
				}
				const [, val] = v;
				let coercedValue: CoercedValue<T>;
				if (typeof val === 'string') {
					coercedValue = this.coerceValue(val);
					if (coercedValue !== undefined && coercedValue !== val) {
						this.value = coercedValue;
					} else if (this.#controlValue !== val) {
						this.#controlValue = val;
						this.#controlValueAccessor.writeValue(val);
					}
				} else if (val === null) {
					if (this.#controlValue !== '') {
						this.#controlValue = '';
						this.#controlValueAccessor.writeValue('');
					}
				} else {
					coercedValue = this.coerceValue(this.#controlValue);
					if (
						coercedValue === undefined ||
						!this.#valuesAreEqual(coercedValue, val)
					) {
						this.#controlValue = this.formatValue(val);
						this.#controlValueAccessor.writeValue(
							this.#controlValue
						);
					}
				}
			});
	}

	/**
	 * Coerces the value to the type supported by this directive
	 * @param v The value to coerce.
	 * @returns The coerced value. If the v is of Type T, it should be returned as is.
	 * If it's null, null is returned
	 * If it's a string, it should be converted to the type T and returned.
	 * If the conversion from string fails, undefined should be returned.
	 * @protected
	 */
	protected abstract coerceValue(v: ControlValue<T>): CoercedValue<T>;

	/**
	 * Formats the value for display.
	 * @param v The value to format.
	 * @returns The formatted value.
	 * @protected
	 */
	protected abstract formatValue(v: T): string;

	/**
	 * Determines if two values are equal.
	 * @param v1 The first value.
	 * @param v2 The second value.
	 * @returns True if the values are equal, otherwise false.
	 * @protected
	 */
	#valuesAreEqual(v1: T | null, v2: T | null): boolean {
		if (v1 === null) {
			return v2 === null;
		}
		if (v2 === null) {
			return false;
		}
		return this.inputsEqual(v1, v2);
	}

	/**
	 * Determines if two values are equal.
	 * @param v1 The first value.
	 * @param v2 The second value.
	 * @returns True if the values are equal, otherwise false.
	 * @protected
	 */
	protected abstract inputsEqual(v1: T, v2: T): boolean;
}
