import { generatePipeTest } from './pipe-test.spec';
import { dateFormatter } from '@code-art-eg/globalite';
import { GlobalizeDatePipe } from './globalize-date.pipe';
import { BaseGlobalizePipe } from './base-globalize-pipe';
import { DateOnly } from '../types';

describe('GlobalizeDatePipe', () => {
	generatePipeTest(
		GlobalizeDatePipe as new () => BaseGlobalizePipe<
			Date,
			Intl.DateTimeFormatOptions
		>,
		{
			style: 'decimal',
			useGrouping: true,
		} as Intl.DateTimeFormatOptions,
		'd',
		new Date(2008, 7, 16),
		dateFormatter,
		new Date(2015, 1, 29)
	);
});

describe('GlobalizeDateOnlyPipe', () => {
	generatePipeTest(
		GlobalizeDatePipe as new () => BaseGlobalizePipe<
			DateOnly,
			Intl.DateTimeFormatOptions
		>,
		{
			style: 'decimal',
			useGrouping: true,
		} as Intl.DateTimeFormatOptions,
		'd',
		{ year: 2008, month: 7, day: 16 } as DateOnly,
		(locale, format) => {
			const df = dateFormatter(locale, format as string, undefined);
			return (value: DateOnly) =>
				df(new Date(value.year, value.month - 1, value.day));
		},
		{ year: 2015, month: 1, day: 29 } as DateOnly
	);
});
