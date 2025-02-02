import { GlobalizeMonthPipe } from './globalize-month.pipe';
import { generatePipeTest } from './pipe-test.spec';
import { getMonthName } from '@code-art-eg/globalite';
import { MonthDisplay } from '../types';

describe('GlobalizeMonthPipe', () => {
	generatePipeTest(
		GlobalizeMonthPipe,
		'long' as MonthDisplay,
		'MMMM',
		1 as number,
		(locale: string, format: MonthDisplay | string) => month => {
			let calendar: 'islamic' | 'gregory' = 'gregory';
			let monthFormat: 'long' | 'short' | 'narrow' = 'long';
			if (format === '') {
				monthFormat = 'long';
			} else if (format === 'M') {
				monthFormat = 'narrow';
			} else if (format === 'MM') {
				monthFormat = 'short';
			} else if (format === 'MMM') {
				monthFormat = 'short';
			} else if (format === 'MMMM') {
				monthFormat = 'long';
			} else if (
				format === 'long' ||
				format === 'short' ||
				format === 'narrow'
			) {
				monthFormat = format;
			} else if (
				format === 'long-islamic' ||
				format === 'short-islamic' ||
				format === 'narrow-islamic'
			) {
				monthFormat = format.slice(0, format.indexOf('-')) as
					| 'long'
					| 'short'
					| 'narrow';
				calendar = 'islamic';
			}
			return getMonthName(locale, month, monthFormat, calendar);
		},
		2 as number
	);
});
