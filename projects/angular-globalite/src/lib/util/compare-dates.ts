import { DateOnly } from '../types';

export function compareDates(d1: Date | DateOnly, d2: Date | DateOnly): number {
	const date1 =
		d1 instanceof Date ? d1 : new Date(d1.year, d1.month - 1, d1.day);
	const date2 =
		d2 instanceof Date ? d2 : new Date(d2.year, d2.month - 1, d2.day);
	return date1.getTime() - date2.getTime();
}
