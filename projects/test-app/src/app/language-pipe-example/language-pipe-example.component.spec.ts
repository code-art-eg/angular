import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagePipeExampleComponent } from './language-pipe-example.component';

describe('LanguagePipeExampleComponent', () => {
	let component: LanguagePipeExampleComponent;
	let fixture: ComponentFixture<LanguagePipeExampleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LanguagePipeExampleComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(LanguagePipeExampleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
