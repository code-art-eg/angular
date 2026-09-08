import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberPipeExampleComponent } from './number-pipe-example.component';

describe('NumberPipeExampleComponent', () => {
	let component: NumberPipeExampleComponent;
	let fixture: ComponentFixture<NumberPipeExampleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NumberPipeExampleComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(NumberPipeExampleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
