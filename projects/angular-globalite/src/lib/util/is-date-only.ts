import { DateOnly } from '../types';

const monthDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export function isDateOnly(v: unknown): v is DateOnly {
	if (v == null) {
		return false;
	}
	if (typeof v !== 'object') {
		return false;
	}

	if (
		'year' in v &&
		'month' in v &&
		'day' in v &&
		typeof v.year === 'number' &&
		typeof v.month === 'number' &&
		typeof v.day === 'number' &&
		v.year >= 0 &&
		v.month >= 1 &&
		v.month <= 12 &&
		v.day >= 1
	) {
		let daysInMonth = monthDays[v.month - 1];
		if (
			v.month === 2 &&
			v.year % 4 === 0 &&
			(v.year % 100 !== 0 || v.year % 400 === 0)
		) {
			daysInMonth = 29;
		}
		return v.day <= daysInMonth;
	}
	return false;
}
