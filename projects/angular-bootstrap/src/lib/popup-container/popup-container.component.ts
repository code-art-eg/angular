import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ComponentRef,
	DestroyRef,
	inject,
	OnDestroy,
	TemplateRef,
	Type,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { IPopupComponent, PopupOptions } from '../types';
import {
	firstValueFrom,
	from,
	isObservable,
	map,
	Observable,
	Subject,
	Subscription,
} from 'rxjs';
import { DefaultExport } from '@angular/router';
import { isPromise } from '../util/is-promise';
import { observableFromPromise } from '../util/observable-from-promise';
import { isDefaultExport } from '../util/is-default-export';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'bs-container',
	imports: [NgTemplateOutlet, NgIf],
	templateUrl: './popup-container.component.html',
	styleUrl: './popup-container.component.scss',
})
export class PopupContainerComponent<TInput, TResult>
	implements IPopupComponent<TInput, unknown>, AfterViewInit, OnDestroy
{
	readonly #cd = inject(ChangeDetectorRef);

	@ViewChild('componentContainer', { static: true, read: ViewContainerRef })
	componentContainer: ViewContainerRef | null = null;
	#componentRef: ComponentRef<IPopupComponent<TInput, TResult>> | null = null;
	#dataSet = false;
	#data: TInput | undefined = undefined;
	output = new Subject<TResult>();
	#options: PopupOptions<TInput, TResult> | null = null;
	#sub: Subscription | null = null;
	#destroyRef = inject(DestroyRef);

	get headerTemplate(): TemplateRef<unknown> | null {
		return this.#componentRef?.instance?.headerTemplate ?? null;
	}

	get footerTemplate(): TemplateRef<unknown> | null {
		return this.#componentRef?.instance?.footerTemplate ?? null;
	}

	setData(data: TInput): void {
		if (this.#dataSet) {
			throw new Error('data already set');
		}
		if (this.#componentRef) {
			throw new Error('component already created');
		}
		this.#data = data;
		this.#dataSet = true;
	}

	ngOnDestroy(): void {
		if (this.#componentRef) {
			this.#componentRef.destroy();
			this.#componentRef = null;
		}
		if (this.#sub) {
			this.#sub.unsubscribe();
			this.#sub = null;
		}
		this.output.complete();
	}

	async ngAfterViewInit(): Promise<void> {
		if (this.componentContainer === null) {
			throw new Error('component container was not found');
		}
		if (this.#options === null) {
			throw new Error('popup options were not set');
		}
		this.#componentRef = await this.#createComponent(this.#options);
		this.#cd.detectChanges();
	}

	setPopupOptions(options: PopupOptions<TInput, TResult>): void {
		if (this.#options) {
			throw new Error('popup options already set');
		}
		this.#options = options;
	}

	closePopup(): void {
		this.output.complete();
	}

	#createComponent(
		options: PopupOptions<TInput, TResult>
	): Promise<ComponentRef<IPopupComponent<TInput, TResult>>> {
		if (this.#data === undefined) {
			throw new Error('data was not set');
		}
		let componentType = options.component;
		if (!componentType) {
			if (!options.loadComponent) {
				throw new Error('component or loadComponent must be specified');
			}
			componentType = options.loadComponent();
		} else if (options.loadComponent) {
			throw new Error(
				'both component and loadComponent cannot be specified'
			);
		}
		let type$: Observable<
			| Type<IPopupComponent<TInput, TResult>>
			| DefaultExport<Type<IPopupComponent<TInput, TResult>>>
		>;
		if (isObservable(componentType)) {
			type$ = componentType;
		} else if (isPromise(componentType)) {
			type$ = observableFromPromise(componentType);
		} else {
			type$ = from([componentType]);
		}
		return firstValueFrom(
			type$.pipe(
				map(t => {
					if (this.componentContainer === null) {
						throw new Error(
							'component container is not yet initialized'
						);
					}
					if (isDefaultExport(t)) {
						t = t.default;
					}
					const componentRef =
						this.componentContainer.createComponent(t);
					if (!this.#dataSet) {
						throw new Error('data was not set');
					}
					componentRef.instance.setData(this.#data!);
					this.#sub = componentRef.instance.output
						.pipe(takeUntilDestroyed(this.#destroyRef))
						.subscribe({
							next: res => {
								this.output.next(res);
							},
							error: err => {
								this.output.error(err);
							},
							complete: () => {
								this.output.complete();
							},
						});

					return componentRef;
				})
			)
		);
	}
}
