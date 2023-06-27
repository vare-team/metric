import { AppErrorInvalid, AppErrorMissing } from '../utils/errors.js';
import SdcStat from '../models/sdc-stat.js';
import { Op } from 'sequelize';
import countCategories from '../configs/count-categories.js';
import fillDates from '../utils/fill-dates.js';

export default async function ({ category, query: { days = 0 } }, res) {
	if (!category) throw new AppErrorMissing('category');
	if (!countCategories.includes(category)) throw new AppErrorInvalid('category');
	const date = new Date();
	date.setDate(date.getDate() - days + 1);

	const dbResult = await SdcStat.findAll({
		attributes: ['date', category],
		order: ['date'],
		where: { date: { [Op.gte]: date } },
	});

	const result = dbResult.reduce(
		(p, c) => ({
			...p,
			[c.date]: c[category],
		}),
		{}
	);

	res.json(fillDates(result, date));
}
