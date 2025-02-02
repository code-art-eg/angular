import { createCookie } from './create-cookie';

describe('createCookie', () => {
	let mockDocument: Document;

	beforeEach(() => {
		mockDocument = {
			cookie: '',
		} as unknown as Document;
	});

	it('should create a cookie with the given name and value', () => {
		createCookie(mockDocument, 'testName', 'testValue', 60, '/');
		expect(mockDocument.cookie).toContain('testName=testValue');
	});

	it('should create a cookie with the correct expiration date', () => {
		const minutes = 60;
		const date = new Date();
		date.setTime(date.getTime() + minutes * 60_000);
		const expectedExpires = `; expires=${date.toUTCString()}`;

		createCookie(mockDocument, 'testName', 'testValue', minutes, '/');
		expect(mockDocument.cookie).toContain(expectedExpires);
	});

	it('should create a cookie with the correct path', () => {
		createCookie(mockDocument, 'testName', 'testValue', 60, '/testPath');
		expect(mockDocument.cookie).toContain('; path=/testPath');
	});

	it('should delete a cookie if the value is null', () => {
		createCookie(mockDocument, 'testName', null, 60, '/');
		expect(mockDocument.cookie).toContain('testName=null');
	});

	it('should encode the cookie name and value', () => {
		createCookie(mockDocument, 'test Name', 'test Value', 60, '/');
		expect(mockDocument.cookie).toContain('test%20Name=test%20Value');
	});

	it('should handle a null document gracefully', () => {
		expect(() =>
			createCookie(null, 'testName', 'testValue', 60, '/')
		).not.toThrow();
	});
});
