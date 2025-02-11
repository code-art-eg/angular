import { Component, inject } from '@angular/core';
import { PopupService } from '@code-art-eg/angular-forms';

@Component({
	selector: 'app-popup-example',
	imports: [],
	templateUrl: './popup-example.component.html',
})
export class PopupExampleComponent {
	#popupService = inject(PopupService);

	async showAlert() {
		await this.#popupService.showAlert('Hello, World!', 'Test Alert');
	}
}
