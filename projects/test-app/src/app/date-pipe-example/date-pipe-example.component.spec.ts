import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipeExampleComponent } from './date-pipe-example.component';

describe('DatePipeExampleComponent', () => {
	let component: DatePipeExampleComponent;
	let fixture: ComponentFixture<DatePipeExampleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DatePipeExampleComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DatePipeExampleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
