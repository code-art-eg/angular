import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemePickerComponent } from '@code-art-eg/angular-bootstrap';
import { LanguagePickerComponent } from '../language-picker/language-picker.component';

@Component({
	selector: 'app-menu',
	imports: [
		ThemePickerComponent,
		RouterLink,
		RouterLinkActive,
		LanguagePickerComponent,
	],
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.scss',
})
export class MenuComponent {
	toggled = false;
	readonly #router = inject(Router);
	routes: { path: string[]; label: string }[] = [];

	constructor() {
		this.routes = this.#router.config
			.filter(
				r => r.path && r.title && !r.redirectTo && r.path !== 'home'
			)
			.map(r => ({
				path: ['/', ...r.path!.split('/').filter(p => !!p)],
				label: r.title as string,
			}));
	}
}
