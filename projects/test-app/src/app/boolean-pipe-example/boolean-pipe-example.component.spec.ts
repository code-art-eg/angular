import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanPipeExampleComponent } from './boolean-pipe-example.component';

describe('BooleanPipeExampleComponent', () => {
	let component: BooleanPipeExampleComponent;
	let fixture: ComponentFixture<BooleanPipeExampleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [BooleanPipeExampleComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(BooleanPipeExampleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
