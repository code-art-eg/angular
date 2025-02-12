import { Directive, ElementRef, inject, Input } from '@angular/core';
import { MessageService } from '../services/message.service';
import type { ParameterizedMessage } from '../types';
import { Subject, switchMap } from 'rxjs';
import { LocaleService } from '@code-art-eg/angular-globalite';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
	selector: '[frmParameterizedMessage]',
})
export class ParameterizedMessageDirective {
	readonly #messageService = inject(MessageService);
	readonly #elementRef = inject(ElementRef<HTMLElement>);
	readonly #parameterizedMessage$ = new Subject<ParameterizedMessage>();
	readonly #localService = inject(LocaleService);

	constructor() {
		combineLatest([this.#parameterizedMessage$, this.#localService.locale$])
			.pipe(
				takeUntilDestroyed(),
				switchMap(([msg, locale]) =>
					this.#messageService.getFormatedMessage(locale, msg)
				)
			)
			.subscribe(formatedMessage => {
				this.#elementRef.nativeElement.innerText = formatedMessage;
			});
	}

	@Input()
	set frmParameterizedMessage(msg: ParameterizedMessage) {
		this.#parameterizedMessage$.next(msg);
	}
}
