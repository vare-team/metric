import { AppErrorMissing } from '../utils/errors.js';
import GuildStat from '../models/guild-stat.js';
import { Op } from 'sequelize';

export default async function ({ params: { guildId }, query: { days } }, res) {
	if (!guildId) throw new AppErrorMissing('guildId');

	const result = await GuildStat.findAll({
		attributes: ['guildId', guildId],
		order: [['date', 'DESC']],
		where: { guildId, date: { [Op.gt]: days ?? new Date() } },
	});
	res.json(
		result.reduce(
			(accumulator, current) => ({
				...accumulator,
				[current.date]: current[category],
			}),
			{}
		)
	);
}
