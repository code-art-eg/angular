export function readCookie(document: Document, name: string): string | null {
	name = encodeURIComponent(name);
	if (document.cookie.length > 0) {
		let start = document.cookie.indexOf(name + '=');
		if (start !== -1) {
			start = start + name.length + 1;
			let end = document.cookie.indexOf(';', start);
			if (end === -1) {
				end = document.cookie.length;
			}
			return decodeURIComponent(document.cookie.substring(start, end));
		}
	}
	return null;
}
