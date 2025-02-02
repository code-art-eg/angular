import { isWhitespaceOrEmpty } from './is-whitespace-or-empty';

describe('isWhitespaceOrEmpty', () => {
	it('should return true for an empty string', () => {
		expect(isWhitespaceOrEmpty('')).toBe(true);
	});

	it('should return true for a string with only whitespace', () => {
		expect(isWhitespaceOrEmpty('   ')).toBe(true);
	});

	it('should return false for a string with non-whitespace characters', () => {
		expect(isWhitespaceOrEmpty('abc')).toBe(false);
	});

	it('should return false for a string with mixed whitespace and non-whitespace characters', () => {
		expect(isWhitespaceOrEmpty(' abc ')).toBe(false);
	});

	it('should return true for a string with only newline characters', () => {
		expect(isWhitespaceOrEmpty('\n')).toBe(true);
	});

	it('should return true for a string with only tab characters', () => {
		expect(isWhitespaceOrEmpty('\t')).toBe(true);
	});

	it('should return false for a string with mixed whitespace and newline characters', () => {
		expect(isWhitespaceOrEmpty(' \n ')).toBe(true);
	});
});
