import { generatePipeTest } from './pipe-test.spec';
import { durationFormatter } from '@code-art-eg/globalite';
import { GlobalizeDurationPipe } from './globalize-duration.pipe';

describe('GlobalizeDurationPipe', () => {
	generatePipeTest(
		GlobalizeDurationPipe,
		'constant' as string,
		'constant' as string,
		1234567 as number,
		(locale: string, format: string) => durationFormatter(locale, format),
		8974479 as number
	);
});
