import { Component } from '@angular/core';
import { GlobalizeDurationPipe } from '@code-art-eg/angular-globalite';

@Component({
	selector: 'app-duration-pipe-example',
	imports: [GlobalizeDurationPipe],
	templateUrl: './duration-pipe-example.component.html',
})
export class DurationPipeExampleComponent {}
