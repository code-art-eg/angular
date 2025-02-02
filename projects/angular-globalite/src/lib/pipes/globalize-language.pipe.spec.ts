import { generatePipeTest } from './pipe-test.spec';
import { GlobalizeLanguagePipe } from './globalize-language.pipe';
import { getLanguageName } from '@code-art-eg/globalite';

describe('GlobalizeLanguagePipe', () => {
	generatePipeTest(
		GlobalizeLanguagePipe,
		'',
		'',
		'en' as string,
		(locale: string) => lang => {
			return getLanguageName(locale, lang);
		},
		'de' as string
	);
});
