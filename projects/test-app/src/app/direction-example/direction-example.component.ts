import { Component, inject } from '@angular/core';
import {
	GlobalizeDirectionDirective,
	GlobalizeLanguagePipe,
	LocaleService,
} from '@code-art-eg/angular-globalite';

@Component({
	selector: 'app-direction-example',
	imports: [GlobalizeDirectionDirective, GlobalizeLanguagePipe],
	templateUrl: './direction-example.component.html',
})
export class DirectionExampleComponent {
	localService = inject(LocaleService);
}
