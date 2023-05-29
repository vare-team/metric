import { AppErrorInvalid, AppErrorMissing } from '../utils/errors.js';
import SdcStat from '../models/sdc-stat.js';
import { Op } from 'sequelize';
import countCategories from '../configs/count-categories.js';

export default async function ({ category, query: { days } }, res) {
	if (!days) throw new AppErrorMissing('days');
	if (!category) throw new AppErrorMissing('category');
	if (!countCategories.includes(category)) throw new AppErrorInvalid('category');

	const result = await SdcStat.findAll({
		attributes: ['date', category],
		order: [['date', 'DESC']],
		where: { date: { [Op.gt]: days } },
	});
	res.json(
		result.reduce(
			(p, c) => ({
				...p,
				[c.date]: c[category],
			}),
			{}
		)
	);
}
