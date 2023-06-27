import { AppErrorMissing } from '../utils/errors.js';
import GuildStat from '../models/guild-stat.js';
import { Op } from 'sequelize';
import fillDates from '../utils/fill-dates.js';

export default async function ({ params: { guildId }, query: { days } }, res) {
	if (!guildId) throw new AppErrorMissing('guildId');

	const dbResult = await GuildStat.findAll({
		attributes: { exclude: ['guildId'] },
		order: [['date', 'DESC']],
		where: { guildId, date: { [Op.gte]: days ?? new Date() } },
	});

	const result = dbResult.reduce(
		(accumulator, current) => ({
			...accumulator,
			[current.date]: { ...current, date: undefined },
		}),
		{}
	);

	res.json(fillDates(result, new Date(days), { viewed: 0, about: 0, joined: 0 }));
}
