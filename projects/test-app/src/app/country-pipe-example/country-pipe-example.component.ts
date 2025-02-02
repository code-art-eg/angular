import { Component } from '@angular/core';
import { GlobalizeCountryPipe } from '@code-art-eg/angular-globalite';

@Component({
	selector: 'app-country-pipe-example',
	imports: [GlobalizeCountryPipe],
	templateUrl: './country-pipe-example.component.html',
})
export class CountryPipeExampleComponent {}
