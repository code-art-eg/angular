import { generatePipeTest } from './pipe-test.spec';
import { GlobalizeNumberPipe } from './globalize-number.pipe';
import { numberFormatter } from '@code-art-eg/globalite';

describe('GlobalizeNumberPipe', () => {
	generatePipeTest(
		GlobalizeNumberPipe,
		{
			style: 'decimal',
			useGrouping: true,
		} as Intl.NumberFormatOptions,
		'n',
		1234.56 as number,
		numberFormatter,
		6421.56 as number
	);
});
