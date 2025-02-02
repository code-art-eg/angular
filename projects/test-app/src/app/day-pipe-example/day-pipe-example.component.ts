import { Component } from '@angular/core';
import { GlobalizeDayPipe } from '@code-art-eg/angular-globalite';

@Component({
	selector: 'app-day-pipe-example',
	imports: [GlobalizeDayPipe],
	templateUrl: './day-pipe-example.component.html',
})
export class DayPipeExampleComponent {}
