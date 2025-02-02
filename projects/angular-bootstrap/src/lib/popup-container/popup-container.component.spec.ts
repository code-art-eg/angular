import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupContainerComponent } from './popup-container.component';

describe('PopupContainerComponent', () => {
	let component: PopupContainerComponent<string, string>;
	let fixture: ComponentFixture<PopupContainerComponent<string, string>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [PopupContainerComponent],
		});
		fixture = TestBed.createComponent(
			PopupContainerComponent<string, string>
		);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
