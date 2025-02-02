import { DateOnly } from '../types';
import { compareDates } from './compare-dates';

describe('compareDates', () => {
	it('should return 0 for equal Date and DateOnly objects', () => {
		const date = new Date(2023, 9, 10);
		const dateOnly = { year: 2023, month: 10, day: 10 } as DateOnly;
		expect(compareDates(date, dateOnly)).toBe(0);
		expect(compareDates(dateOnly, date)).toBe(0);
	});

	it('should return a positive number when Date is greater than DateOnly', () => {
		const date = new Date(2023, 9, 11);
		const dateOnly = { year: 2023, month: 10, day: 10 } as DateOnly;
		expect(compareDates(date, dateOnly)).toBeGreaterThan(0);
		expect(compareDates(dateOnly, date)).toBeLessThan(0);
	});

	it('should return a negative number when Date is less than DateOnly', () => {
		const date = new Date(2023, 9, 9);
		const dateOnly = { year: 2023, month: 10, day: 10 } as DateOnly;
		expect(compareDates(date, dateOnly)).toBeLessThan(0);
		expect(compareDates(dateOnly, date)).toBeGreaterThan(0);
	});

	it('should return 0 for equal Date objects', () => {
		const date1 = new Date(2023, 9, 10);
		const date2 = new Date(2023, 9, 10);
		expect(compareDates(date1, date2)).toBe(0);
	});

	it('should return 0 for equal DateOnly objects', () => {
		const dateOnly1 = { year: 2023, month: 10, day: 10 } as DateOnly;
		const dateOnly2 = { year: 2023, month: 10, day: 10 } as DateOnly;
		expect(compareDates(dateOnly1, dateOnly2)).toBe(0);
	});

	it('should return a positive number when DateOnly is greater than Date', () => {
		const date = new Date(2023, 9, 9);
		const dateOnly = { year: 2023, month: 10, day: 11 } as DateOnly;
		expect(compareDates(date, dateOnly)).toBeLessThan(0);
		expect(compareDates(dateOnly, date)).toBeGreaterThan(0);
	});

	it('should return a negative number when DateOnly is less than Date', () => {
		const date = new Date(2023, 9, 11);
		const dateOnly = { year: 2023, month: 10, day: 9 } as DateOnly;
		expect(compareDates(date, dateOnly)).toBeGreaterThan(0);
		expect(compareDates(dateOnly, date)).toBeLessThan(0);
	});
});
