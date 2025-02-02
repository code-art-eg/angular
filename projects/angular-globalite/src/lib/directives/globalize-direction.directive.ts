import { Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isRightToLeft } from '../util/is-right-to-left';
import { LocaleService } from '../services/locale.service';

/**
 * Directive to set the text direction (LTR/RTL) and apply corresponding CSS classes based on the locale.
 * The directive uses {@link LocaleService} to get the current locale.
 * The locale can be overridden by setting the `locale` input.
 * The directive will add the `dir` attribute to the element with the value `rtl` or `ltr` based on the locale.
 * The directive will add the CSS class specified in the `rtlCssClass` input when the locale is RTL.
 * The directive will add the CSS class specified in the `ltrCssClass` input when the locale is LTR.
 */
@Directive({
	selector: '[glbDirection]',
})
export class GlobalizeDirectionDirective {
	#locale: string | null = null;
	#el = inject(ElementRef);
	#renderer = inject(Renderer2);
	#isRtl!: boolean; // initially this._isRtl will be undefined we will set it in #handleLocaleChange
	#localeService = inject(LocaleService);
	#rtlCssClass: string | null = null;
	#ltrCssClass: string | null = null;

	constructor() {
		// locale$ is a behavior subject so we will get the current locale immediately
		this.#localeService.locale$
			.pipe(takeUntilDestroyed())
			.subscribe(locale => {
				this.#handleLocaleChange(locale);
			});
	}

	/**
	 * Gets the CSS class for RTL direction.
	 * @returns {string | undefined | null} The CSS class for RTL direction.
	 */
	get rtlCssClass(): string | undefined | null {
		return this.#rtlCssClass;
	}

	/**
	 * Sets the CSS class for RTL direction.
	 * @param {string | null} val The CSS class for RTL direction.
	 */
	@Input() set rtlCssClass(val: string | null) {
		val = val || null;
		if (val !== this.#rtlCssClass) {
			if (this.#isRtl && this.#rtlCssClass) {
				this.#renderer.removeClass(
					this.#el.nativeElement,
					this.#rtlCssClass
				);
			}
			this.#rtlCssClass = val;
			if (this.#isRtl && this.#rtlCssClass) {
				this.#renderer.addClass(
					this.#el.nativeElement,
					this.#rtlCssClass
				);
			}
		}
	}

	/**
	 * Gets the CSS class for LTR direction.
	 * @returns {string | undefined | null} The CSS class for LTR direction.
	 */
	get ltrCssClass(): string | undefined | null {
		return this.#ltrCssClass;
	}

	/**
	 * Sets the CSS class for LTR direction.
	 * @param {string | null} val The CSS class for LTR direction.
	 */
	@Input() set ltrCssClass(val: string | null) {
		val = val || null;
		if (val !== this.#ltrCssClass) {
			if (!this.#isRtl && this.#ltrCssClass) {
				this.#renderer.removeClass(
					this.#el.nativeElement,
					this.#ltrCssClass
				);
			}
			this.#ltrCssClass = val;
			if (!this.#isRtl && this.#ltrCssClass) {
				this.#renderer.addClass(
					this.#el.nativeElement,
					this.#ltrCssClass
				);
			}
		}
	}

	/**
	 * Gets the locale.
	 * @returns {string | null} The locale.
	 */
	get locale(): string | null {
		return this.#locale;
	}

	/**
	 * Sets the locale.
	 * @param {string | null} val The locale.
	 */
	@Input() set locale(val: string | null) {
		val = val || null;
		if (this.#locale !== val) {
			this.#locale = val;
			this.#handleLocaleChange(this.#localeService.currentLocale);
		}
	}

	/**
	 * Handles the locale change and updates the text direction and CSS classes.
	 * @param {string} locale The new locale.
	 */
	#handleLocaleChange(locale: string): void {
		const isRtl: boolean = isRightToLeft(this.#locale ?? locale);
		if (this.#isRtl !== isRtl) {
			// initially this._isRtl will be undefined so this will always be true
			this.#isRtl = isRtl;
			if (this.#isRtl) {
				if (this.#ltrCssClass) {
					this.#renderer.removeClass(
						this.#el.nativeElement,
						this.#ltrCssClass
					);
				}
				if (this.#rtlCssClass) {
					this.#renderer.addClass(
						this.#el.nativeElement,
						this.#rtlCssClass
					);
				}
				this.#renderer.setAttribute(
					this.#el.nativeElement,
					'dir',
					'rtl'
				);
			} else {
				if (this.#ltrCssClass) {
					this.#renderer.addClass(
						this.#el.nativeElement,
						this.#ltrCssClass
					);
				}
				if (this.#rtlCssClass) {
					this.#renderer.removeClass(
						this.#el.nativeElement,
						this.#rtlCssClass
					);
				}
				this.#renderer.setAttribute(
					this.#el.nativeElement,
					'dir',
					'ltr'
				);
			}
		}
	}
}
