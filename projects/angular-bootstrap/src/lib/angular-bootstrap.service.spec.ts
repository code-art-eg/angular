import { TestBed } from '@angular/core/testing';

import { AngularBootstrapService } from './angular-bootstrap.service';

describe('AngularBootstrapService', () => {
	let service: AngularBootstrapService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AngularBootstrapService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
