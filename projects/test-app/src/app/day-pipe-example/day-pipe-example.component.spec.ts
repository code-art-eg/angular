import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DayPipeExampleComponent } from './day-pipe-example.component';

describe('DayPipeExampleComponent', () => {
	let component: DayPipeExampleComponent;
	let fixture: ComponentFixture<DayPipeExampleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DayPipeExampleComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DayPipeExampleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
