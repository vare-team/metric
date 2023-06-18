const dotsCount = 11;

/**
 *
 * @param data {Record<string, Object | number>}
 * @param date {Date}
 */
export default function (data, date) {
	const dates = {};
	const dbEntries = Object.entries(data);
	date.setHours(0, 0, 0);
	date.setDate(date.getDate() - dotsCount);

	for (let i = 0; i < dotsCount; i++) {
		let sort = 0;

		const daysStrings = date.toISOString().split('T')[0];
		for (const [k, v] of dbEntries) {
			if (daysStrings !== k) continue;

			sort = v;

			break;
		}

		dates[daysStrings] = sort;
		date.setDate(date.getDate() + 1);
	}

	return dates;
}
