import SdcStat from '../models/sdc-stat.js';
import { literal } from 'sequelize';
import { AppErrorMissing } from '../utils/errors.js';

export default async function ({ category, body: { guilds } }, res) {
	if (!guilds) throw new AppErrorMissing('guilds');

	await SdcStat.upsert({ date: new Date(), guilds, [category]: literal(`COALESCE(${category}, 0) + 1`) });
	res.end();
}
