import { DateOnly } from '../types';

export function getAge(dateOfBirth: Date | DateOnly) {
	const today = new Date();
	const dob =
		dateOfBirth instanceof Date
			? dateOfBirth
			: new Date(
					dateOfBirth.year,
					dateOfBirth.month - 1,
					dateOfBirth.day
				);
	let age = today.getFullYear() - dob.getFullYear();
	const m = today.getMonth() - dob.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
		age--;
	}
	return age;
}
