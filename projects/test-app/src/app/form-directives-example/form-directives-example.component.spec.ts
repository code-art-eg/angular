import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormDirectivesExampleComponent } from './form-directives-example.component';

describe('FormDirectivesExampleComponent', () => {
	let component: FormDirectivesExampleComponent;
	let fixture: ComponentFixture<FormDirectivesExampleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FormDirectivesExampleComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FormDirectivesExampleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
