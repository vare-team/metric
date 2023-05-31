import GuildStat from '../models/guild-stat.js';
import { AppErrorInvalid, AppErrorMissing } from '../utils/errors.js';
import statCategories from '../configs/stat-categories.js';

export default async function ({ category, params: { guildId } }, res) {
	if (!guildId) throw new AppErrorMissing('guildId');
	if (!category) throw new AppErrorMissing('category');
	if (!statCategories.includes(category)) throw new AppErrorInvalid('category');

	const [stat, created] = await GuildStat.findOrCreate({
		where: { guildId, date: new Date() },
		defaults: { [category]: 1 },
	});

	if (!created) await stat.increment([category]);
	res.end();
}
