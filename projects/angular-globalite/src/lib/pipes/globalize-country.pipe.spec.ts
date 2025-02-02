import { generatePipeTest } from './pipe-test.spec';
import { getCountryName } from '@code-art-eg/globalite';
import { GlobalizeCountryPipe } from './globalize-country.pipe';

describe('GlobalizeCountryPipe', () => {
	generatePipeTest(
		GlobalizeCountryPipe,
		'',
		'',
		'EG' as string,
		(locale: string) => lang => {
			return getCountryName(locale, lang);
		},
		'SY' as string
	);
});
