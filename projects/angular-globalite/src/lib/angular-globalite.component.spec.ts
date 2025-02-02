import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularGlobaliteComponent } from './angular-globalite.component';

describe('AngularGlobaliteComponent', () => {
	let component: AngularGlobaliteComponent;
	let fixture: ComponentFixture<AngularGlobaliteComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AngularGlobaliteComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AngularGlobaliteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
