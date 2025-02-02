import { GlobalizeBooleanPipe } from './globalize-boolean.pipe';
import { generatePipeTest } from './pipe-test.spec';
import { booleanFormatter } from '@code-art-eg/globalite';

describe('GlobalizeBooleanPipe', () => {
	generatePipeTest(
		GlobalizeBooleanPipe,
		'',
		'',
		true as boolean,
		booleanFormatter,
		false as boolean
	);
});
