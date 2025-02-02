import { Component } from '@angular/core';
import { GlobalizeBooleanPipe } from '@code-art-eg/angular-globalite';

@Component({
	selector: 'app-boolean-pipe-example',
	imports: [GlobalizeBooleanPipe],
	templateUrl: './boolean-pipe-example.component.html',
})
export class BooleanPipeExampleComponent {}
