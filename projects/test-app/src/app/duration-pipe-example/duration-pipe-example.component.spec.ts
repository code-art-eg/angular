import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DurationPipeExampleComponent } from './duration-pipe-example.component';

describe('DurationPipeExampleComponent', () => {
	let component: DurationPipeExampleComponent;
	let fixture: ComponentFixture<DurationPipeExampleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DurationPipeExampleComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DurationPipeExampleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
