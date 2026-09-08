import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthPipeExampleComponent } from './month-pipe-example.component';

describe('MonthPipeExampleComponent', () => {
	let component: MonthPipeExampleComponent;
	let fixture: ComponentFixture<MonthPipeExampleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MonthPipeExampleComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MonthPipeExampleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
