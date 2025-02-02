import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionExampleComponent } from './direction-example.component';

describe('DirectionExampleComponent', () => {
	let component: DirectionExampleComponent;
	let fixture: ComponentFixture<DirectionExampleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DirectionExampleComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DirectionExampleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
