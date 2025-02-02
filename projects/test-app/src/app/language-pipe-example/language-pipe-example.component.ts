import { Component } from '@angular/core';
import { GlobalizeLanguagePipe } from '@code-art-eg/angular-globalite';

@Component({
	selector: 'app-language-pipe-example',
	imports: [GlobalizeLanguagePipe],
	templateUrl: './language-pipe-example.component.html',
})
export class LanguagePipeExampleComponent {}
