export function createCookie(
	document: Document | null,
	name: string,
	value: string | null,
	minutes: number,
	path: string
): void {
	if (!document) {
		return;
	}
	if (!value) {
		minutes = -365 * 24 * 60;
	} else {
		value = encodeURIComponent(value);
	}
	let expires: string;
	if (minutes) {
		const date = new Date();
		date.setTime(date.getTime() + minutes * 60_000);
		expires = `; expires=${date.toUTCString()}`;
	} else {
		expires = '';
	}
	name = encodeURIComponent(name);
	document.cookie = `${name}=${value}${expires}; path=${path}`;
}
