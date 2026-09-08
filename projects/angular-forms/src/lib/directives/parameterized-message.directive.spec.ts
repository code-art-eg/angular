import { ParameterizedMessageDirective } from './parameterized-message.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from '../services/message.service';
import { LocaleService } from '@code-art-eg/angular-globalite';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

@Component({
	template: `<div [frmParameterizedMessage]="message"></div>`,
	imports: [ParameterizedMessageDirective],
})
class TestComponent {
	message = { messageKey: 'test', context: 'test' };
}

describe('ParameterizedMessageDirective', () => {
	let fixture: ComponentFixture<TestComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TestComponent],
			providers: [
				{
					provide: MessageService,
					useValue: {
						getFormatedMessage: () => of('Formatted Message'),
					},
				},
				{
					provide: LocaleService,
					useValue: { locale$: of('en-US') },
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(TestComponent);
		fixture.detectChanges();
	});

	it('should create an instance', () => {
		const directive = fixture.debugElement
			.query(By.directive(ParameterizedMessageDirective))
			.injector.get(ParameterizedMessageDirective);
		expect(directive).toBeTruthy();
	});
});
