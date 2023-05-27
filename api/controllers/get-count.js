import { AppErrorMissing } from '../utils/errors.js';
import SdcStat from '../models/sdc-stat.js';
import { Op } from 'sequelize';

export default async function getCount({ category, query: { days } }, res) {
	if (!days) throw new AppErrorMissing('days');

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
