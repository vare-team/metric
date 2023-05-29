import { AppErrorInvalid, AppErrorMissing } from '../utils/errors.js';
import GuildStat from '../models/guild-stat.js';
import { Op } from 'sequelize';
import statCategories from '../configs/stat-categories.js';

export default async function ({ params: { guildId }, query: { days, category } }, res) {
	if (!guildId) throw new AppErrorMissing('guildId');
	if (!category) throw new AppErrorMissing('category');
	if (!statCategories.includes(category)) throw new AppErrorInvalid('category');

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
