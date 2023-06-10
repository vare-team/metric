import GuildStat from '../models/guild-stat.js';
import { literal, Op } from 'sequelize';

export default async function (guildIds, category) {
	const date = new Date();
	if (guildIds.length === 1) {
		const [model, created] = await GuildStat.findOrCreate({
			where: { guildId: guildIds[0], date: date },
			defaults: { [category]: 1 },
		});

		if (!created) await model.increment([category]);
		return;
	}

	const dataArray = await GuildStat.findAll({
		where: { guildId: guildIds, date: date },
	});

	const toUpdate = [];
	const toCreate = [];

	for (const id of guildIds) {
		const instance = dataArray.find(x => x.guildId === id);
		if (instance) {
			toUpdate.push({ [Op.and]: { guildId: id, date: date } });
			continue;
		}
		toCreate.push({ guildId: id, date: date, [category]: 1 });
	}

	await GuildStat.bulkCreate(toCreate);
	await GuildStat.update({ [category]: literal(`${category} + 1`) }, { where: { [Op.or]: toUpdate } });
}
