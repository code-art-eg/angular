import { readCookie } from './read-cookie';

describe('readCookie', () => {
	let mockDocument: Document;

	beforeEach(() => {
		mockDocument = {
			cookie: 'testName=testValue; anotherName=anotherValue',
		} as unknown as Document;
	});

	it('should return the value of the specified cookie', () => {
		const value = readCookie(mockDocument, 'testName');
		expect(value).toBe('testValue');
	});

	it('should return null if the cookie does not exist', () => {
		const value = readCookie(mockDocument, 'nonExistentName');
		expect(value).toBeNull();
	});

	it('should handle cookies with encoded characters', () => {
		mockDocument.cookie = 'encodedName=encoded%20Value';
		const value = readCookie(mockDocument, 'encodedName');
		expect(value).toBe('encoded Value');
	});
});
