import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemePickerComponent } from './theme-picker.component';
import { THEME_PROVIDER_TOKEN } from '../constants';
import type { Theme, ThemeProvider } from '../types';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { PickerComponent } from '../picker/picker.component';

// noinspection JSUnusedGlobalSymbols
class MockThemeProvider {
	readonly theme$ = new BehaviorSubject<Theme | null>(null);
	#theme: Theme | null = null;

	get theme(): Theme | null {
		return this.#theme;
	}

	set theme(theme: Theme | null) {
		this.#theme = theme;
		this.theme$.next(theme);
	}
}

describe('ThemePickerComponent', () => {
	let component: ThemePickerComponent;
	let fixture: ComponentFixture<ThemePickerComponent>;
	let mockThemeProvider: ThemeProvider;

	beforeEach(async () => {
		mockThemeProvider = new MockThemeProvider();

		await TestBed.configureTestingModule({
			declarations: [],
			providers: [
				{ provide: THEME_PROVIDER_TOKEN, useValue: mockThemeProvider },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ThemePickerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize buttons with correct labels', () => {
		expect(
			component.options.find(option => option.value === 'light')?.label
		).toBe('Light');
		expect(
			component.options.find(option => option.value === 'dark')?.label
		).toBe('Dark');
		expect(
			component.options.find(option => option.value === null)?.label
		).toBe('Auto');
	});

	it('should show non-default labels', () => {
		component.lightLabel = 'Light Theme';
		component.darkLabel = 'Dark Theme';
		component.autoLabel = 'Auto Theme';
		component.ngOnChanges({
			lightLabel: {
				currentValue: 'Light Theme',
				previousValue: 'Light',
				firstChange: false,
				isFirstChange: () => false,
			},
			darkLabel: {
				currentValue: 'Dark Theme',
				previousValue: 'Dark',
				firstChange: false,
				isFirstChange: () => false,
			},
			autoLabel: {
				currentValue: 'Auto Theme',
				previousValue: 'Auto',
				firstChange: false,
				isFirstChange: () => false,
			},
		});
		expect(
			component.options.find(option => option.value === 'light')?.label
		).toBe('Light Theme');
		expect(
			component.options.find(option => option.value === 'dark')?.label
		).toBe('Dark Theme');
		expect(
			component.options.find(option => option.value === null)?.label
		).toBe('Auto Theme');
	});

	it('should change theme when PickerComponent emits a value', () => {
		const pickerComponent = fixture.debugElement.query(
			By.directive(PickerComponent)
		).componentInstance as PickerComponent;
		expect(pickerComponent).toBeTruthy();
		expect(pickerComponent.value).toBeNull();
		expect(mockThemeProvider.theme).toBeNull();
		pickerComponent.valueChange.emit('dark');
		fixture.detectChanges();
		expect(mockThemeProvider.theme).toBe('dark');
	});
});
