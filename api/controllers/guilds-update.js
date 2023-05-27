import SdcStat from '../models/sdc-stat.js';
import { literal } from 'sequelize';
import { AppErrorMissing } from '../utils/errors.js';

export default async function ({ category, body: { guilds } }, res) {
	if (!guilds) throw new AppErrorMissing('guilds');

	const upTime = new Date();
	const [stat, created] = await SdcStat.findOrCreate({
		where: { date: upTime },
		defaults: { guilds, [category]: 1 },
	});

	if (!created) await stat.update({ guilds, [category]: literal(`${category} + 1`) });
	res.end();
}
