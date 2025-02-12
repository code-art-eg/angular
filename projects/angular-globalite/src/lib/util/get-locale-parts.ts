export const localeNameRegex =
	/^\s*([A-Za-z]{2})(?:(?:[-_]([A-Za-z]{2,6}))?[-_]([a-zA-Z]{2}))?\s*$/;

export interface LocaleParts {
	language: string;
	script: string | null;
	region: string | null;
}

export function getLocaleParts(locale: string): LocaleParts {
	if (!locale) {
		throw new Error('Invalid locale name');
	}
	locale = locale.trim();
	if (locale.length === 0) {
		throw new Error('Invalid locale name');
	}

	const match = localeNameRegex.exec(locale);
	if (!match) {
		throw new Error('Invalid locale name');
	}

	const language = match[1].toLowerCase();
	const script = match[2]
		? match[2][0].toUpperCase() + match[2].slice(1).toLowerCase()
		: null;
	const region = match[3] ? match[3].toUpperCase() : null;

	if (script && !region) {
		throw new Error('Invalid locale name: ' + locale);
	}
	return {
		language,
		script,
		region,
	};
}
