import { isDefaultExport } from './is-default-export';

class Test {}
describe('isDefaultExport', () => {
	it('should return true for a default export object', () => {
		const defaultExport = { default: Test };
		expect(isDefaultExport(defaultExport)).toBe(true);
	});

	it('should return false for a non-default export object', () => {
		expect(isDefaultExport(Test)).toBe(false);
	});
});
