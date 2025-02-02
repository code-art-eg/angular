import { Component } from '@angular/core';
import { GlobalizeMonthPipe } from '@code-art-eg/angular-globalite';

@Component({
	selector: 'app-month-pipe-example',
	imports: [GlobalizeMonthPipe],
	templateUrl: './month-pipe-example.component.html',
})
export class MonthPipeExampleComponent {}
