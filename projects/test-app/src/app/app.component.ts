// noinspection JSUnusedLocalSymbols

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '@code-art-eg/angular-bootstrap';
import { MenuComponent } from './menu/menu.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, MenuComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	// eslint-disable-next-line no-unused-private-class-members
	readonly #themeService = inject(ThemeService);

	title = 'test-app';
}
