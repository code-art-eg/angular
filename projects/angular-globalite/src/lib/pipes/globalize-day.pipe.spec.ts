import { generatePipeTest } from './pipe-test.spec';
import { getDayName } from '@code-art-eg/globalite';
import { WeekdayDisplay } from '../types';
import { GlobalizeDayPipe } from './globalize-day.pipe';

describe('GlobalizeDayPipe', () => {
	generatePipeTest(
		GlobalizeDayPipe,
		'long' as WeekdayDisplay,
		'DDDD',
		1 as number,
		(locale: string, format: WeekdayDisplay | string) => month => {
			let dayFormat: 'long' | 'short' | 'narrow' = 'long';
			if (format === '') {
				dayFormat = 'long';
			} else if (format === 'D') {
				dayFormat = 'narrow';
			} else if (format === 'DD') {
				dayFormat = 'short';
			} else if (format === 'DDD') {
				dayFormat = 'short';
			} else if (format === 'DDDD') {
				dayFormat = 'long';
			} else if (
				format === 'long' ||
				format === 'short' ||
				format === 'narrow'
			) {
				dayFormat = format;
			}
			return getDayName(locale, month, dayFormat);
		},
		2 as number
	);
});
