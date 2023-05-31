import GuildStat from '../models/guild-stat.js';

export default async function (guildId, category) {
	const [stat, created] = await GuildStat.findOrCreate({
		where: { guildId, date: new Date() },
		defaults: { [category]: 1 },
	});

	if (!created) await stat.increment([category]);
}
