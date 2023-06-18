import { AppErrorInvalid, AppErrorMissing } from '../utils/errors.js';
import SdcStat from '../models/sdc-stat.js';
import { Op } from 'sequelize';
import countCategories from '../configs/count-categories.js';
import fillDates from '../utils/fill-dates.js';

export default async function ({ category, query: { days } }, res) {
	if (!days) throw new AppErrorMissing('days');
	if (!category) throw new AppErrorMissing('category');
	if (!countCategories.includes(category)) throw new AppErrorInvalid('category');

	const dbResult = await SdcStat.findAll({
		attributes: ['date', category],
		order: [['date', 'DESC']],
		where: { date: { [Op.gt]: days } },
	});

	const result = dbResult.reduce(
		(p, c) => ({
			...p,
			[c.date]: c[category],
		}),
		{}
	);

	res.json(fillDates(result, new Date(days)));
}
