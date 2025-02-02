import { TestBed } from '@angular/core/testing';

import { AngularGlobaliteService } from './angular-globalite.service';

describe('AngularGlobaliteService', () => {
	let service: AngularGlobaliteService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AngularGlobaliteService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
