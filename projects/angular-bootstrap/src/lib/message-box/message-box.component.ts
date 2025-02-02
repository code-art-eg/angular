import { Component, TemplateRef, ViewChild } from '@angular/core';
import type { DialogButton, IPopupComponent, MessageBoxData } from '../types';
import { Subject } from 'rxjs';
import { DEFAULT_BUTTONS } from '../constants';
import { NgClass, NgForOf, NgIf } from '@angular/common';

@Component({
	selector: 'bs-message-box',
	imports: [NgForOf, NgClass, NgIf],
	templateUrl: './message-box.component.html',
	styleUrl: './message-box.component.css',
})
export class MessageBoxComponent
	implements IPopupComponent<MessageBoxData, string>
{
	#data: MessageBoxData | null = null;

	@ViewChild('headerTemplate') headerTemplate: TemplateRef<unknown> | null =
		null;
	@ViewChild('footerTemplate') footerTemplate: TemplateRef<unknown> | null =
		null;
	output: Subject<string> = new Subject<string>();

	setData(data: MessageBoxData): void {
		this.#data = data;
	}

	get title(): string {
		return this.#data?.title ?? '';
	}

	get message(): string {
		return this.#data?.message ?? '';
	}

	get buttons(): DialogButton[] {
		return this.#data?.buttons ?? DEFAULT_BUTTONS;
	}

	getButtonClass(btn: DialogButton): Record<string, true> {
		return {
			['btn-' + btn.buttonType]: true,
		};
	}

	get icon(): string | null {
		return this.#data?.icon ?? null;
	}

	get iconClass(): Record<string, true> {
		if (!this.#data?.icon) {
			return {};
		}
		if (!this.#data.iconColor) {
			return {
				['bi-' + this.#data.icon]: true,
			};
		}
		return {
			['bi-' + this.#data.icon]: true,
			['text-' + this.#data.iconColor]: true,
		};
	}

	handleButtonClick(btn: DialogButton): void {
		this.output.next(btn.id);

		if (btn.close) {
			this.output.complete();
		}
	}
}
