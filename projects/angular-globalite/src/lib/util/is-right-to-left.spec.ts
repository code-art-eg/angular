import { isRightToLeft } from './is-right-to-left';

describe('isRightToLeft', () => {
	it('should return true for RTL languages', () => {
		expect(isRightToLeft('ar')).toBe(true);
		expect(isRightToLeft('ur')).toBe(true);
		expect(isRightToLeft('fa')).toBe(true);
	});

	it('should return false for LTR languages', () => {
		expect(isRightToLeft('en')).toBe(false);
		expect(isRightToLeft('fr')).toBe(false);
		expect(isRightToLeft('de')).toBe(false);
	});

	it('should handle locale with region', () => {
		expect(isRightToLeft('ar-EG')).toBe(true);
		expect(isRightToLeft('en-US')).toBe(false);
	});

	it('should handle case insensitivity', () => {
		expect(isRightToLeft('AR')).toBe(true);
		expect(isRightToLeft('He')).toBe(true);
		expect(isRightToLeft('EN')).toBe(false);
	});

	it('should return false for unknown languages', () => {
		expect(isRightToLeft('xx')).toBe(false);
	});

	it('should return true for arabic script', () => {
		expect(isRightToLeft('xx-Arab-YY')).toBe(true);
		expect(isRightToLeft(' xx-arab-YY ')).toBe(true);
	});
});
