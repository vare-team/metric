/**
 *
 * @param data {Record<string, Object | number>}
 * @param date {Date}
 * @param defaultValue {*}
 */
export default function (data, date, defaultValue = 0) {
	const now = Date.now();
	date.setHours(0, 0, 0);

	while (date.getTime() < now) {
		const daysStrings = date.toISOString().split('T')[0];
		data[daysStrings] =
			data[daysStrings] ?? (typeof defaultValue === 'number' ? defaultValue : { ...defaultValue, date: daysStrings });
		date.setDate(date.getDate() + 1);
	}

	return data;
}
