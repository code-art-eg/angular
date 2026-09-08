import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryPipeExampleComponent } from './country-pipe-example.component';

describe('CountryPipeExampleComponent', () => {
	let component: CountryPipeExampleComponent;
	let fixture: ComponentFixture<CountryPipeExampleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CountryPipeExampleComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CountryPipeExampleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
