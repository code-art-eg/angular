import { TestBed } from '@angular/core/testing';

import { AngularFormsService } from './angular-forms.service';

describe('AngularFormsService', () => {
	let service: AngularFormsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AngularFormsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
