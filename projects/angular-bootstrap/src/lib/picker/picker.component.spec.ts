import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PickerComponent } from './picker.component';
import { By } from '@angular/platform-browser';

describe('PickerComponent', () => {
	let component: PickerComponent;
	let fixture: ComponentFixture<PickerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({}).compileComponents();

		fixture = TestBed.createComponent(PickerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize with correct buttons', () => {
		component.selections = [
			{ icon: 'sun-fill', value: 'light', label: 'Light' },
			{ icon: 'moon-stars-fill', value: 'dark', label: 'Dark' },
			{ icon: 'circle-half', value: null, label: 'Auto' },
		];
		fixture.detectChanges();

		expect(component.buttons.length).toBe(3);
		expect(component.buttons[0].label).toBe('Light');
		expect(component.buttons[1].label).toBe('Dark');
		expect(component.buttons[2].label).toBe('Auto');
	});

	it('should set show to true when picker is clicked and false when dismissed', () => {
		// Simulate clicking the picker to show the menu
		const pickerButton = fixture.debugElement.query(
			By.css('.dropdown-toggle')
		);
		pickerButton.triggerEventHandler('click', null);
		fixture.detectChanges();
		expect(component.show).toBe(true);

		// Simulate clicking the picker to dismiss the menu
		pickerButton.triggerEventHandler('click', null);
		fixture.detectChanges();
		expect(component.show).toBe(false);
	});

	it('should set show to true when picker is clicked and false when a selection is made', () => {
		// Simulate clicking the picker to show the menu
		component.selections = [
			{ icon: 'sun-fill', value: 'light', label: 'Light' },
			{ icon: 'moon-stars-fill', value: 'dark', label: 'Dark' },
			{ icon: 'circle-half', value: null, label: 'Auto' },
		];
		fixture.detectChanges();

		const pickerButton = fixture.debugElement.query(
			By.css('.dropdown-toggle')
		);
		pickerButton.triggerEventHandler('click', null);
		fixture.detectChanges();
		expect(component.show).toBe(true);

		// Simulate clicking the picker to dismiss the menu
		const firstOption = fixture.debugElement.query(
			By.css('.dropdown-item')
		);

		firstOption.triggerEventHandler('click', null);
		fixture.detectChanges();
		expect(component.show).toBe(false);
	});

	it('should emit valueChange when a button is clicked', () => {
		spyOn(component.valueChange, 'emit');
		component.selections = [
			{ icon: 'sun-fill', value: 'light', label: 'Light' },
			{ icon: 'moon-stars-fill', value: 'dark', label: 'Dark' },
			{ icon: 'circle-half', value: null, label: 'Auto' },
		];
		fixture.detectChanges();

		const button = fixture.debugElement.query(By.css('.dropdown-item'));
		button.triggerEventHandler('click', null);
		fixture.detectChanges();

		expect(component.valueChange.emit).toHaveBeenCalledWith('light');
	});

	it('should update active button on value change', () => {
		component.selections = [
			{ icon: 'sun-fill', value: 'light', label: 'Light' },
			{ icon: 'moon-stars-fill', value: 'dark', label: 'Dark' },
			{ icon: 'circle-half', value: null, label: 'Auto' },
		];
		component.value = 'dark';
		fixture.detectChanges();

		expect(component.buttons[1].active).toBe(true);
		expect(component.buttons[0].active).toBe(false);
		expect(component.buttons[2].active).toBe(false);
	});

	it('should return the correct active icon', () => {
		component.selections = [
			{ icon: 'sun-fill', value: 'light', label: 'Light' },
			{ icon: 'moon-stars-fill', value: 'dark', label: 'Dark' },
			{ icon: 'circle-half', value: null, label: 'Auto' },
		];
		component.value = 'dark';
		fixture.detectChanges();

		expect(component.getActiveIcon()).toBe('moon-stars-fill');
	});
});
