import {
	ApplicationRef,
	createComponent,
	inject,
	Injectable,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { PopupContainerComponent } from '../components/popup-container/popup-container.component';
import { MessageBoxData } from '../types';
import { MessageBoxComponent } from '../components/message-box/message-box.component';

@Injectable({
	providedIn: 'root',
})
export class PopupService {
	readonly #appRef = inject(ApplicationRef);
	readonly #document = inject(DOCUMENT);

	async showAlert(title: string, message: string): Promise<void> {
		const componentRef = createComponent(
			PopupContainerComponent<MessageBoxData, string>,
			{
				environmentInjector: this.#appRef.injector,
			}
		);
		this.#appRef.attachView(componentRef.hostView);
		componentRef.instance.setPopupOptions({
			component: MessageBoxComponent,
		});

		componentRef.instance.setData({
			message,
			title,
		});

		this.#document.body.appendChild(componentRef.location.nativeElement);

		try {
			await lastValueFrom(componentRef.instance.output);
		} catch (e: unknown) {
			if (
				e &&
				typeof e === 'object' &&
				'name' in e &&
				e.name === 'EmptyError'
			) {
				// close
				return;
			}
			throw e;
		} finally {
			this.#appRef.detachView(componentRef.hostView);
			componentRef.destroy();
		}
	}
}
