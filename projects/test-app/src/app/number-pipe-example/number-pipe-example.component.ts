import { Component } from '@angular/core';
import {
	asyncScheduler,
	concatAll,
	from,
	interval,
	map,
	scheduled,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GlobalizeNumberPipe } from '@code-art-eg/angular-globalite';

@Component({
	selector: 'app-number-pipe-example',
	templateUrl: './number-pipe-example.component.html',
	imports: [GlobalizeNumberPipe],
})
export class NumberPipeExampleComponent {
	number$ = scheduled(
		[from([0]), interval(1000).pipe(map(o => o + 1))],
		asyncScheduler
	).pipe(concatAll(), takeUntilDestroyed());
}
