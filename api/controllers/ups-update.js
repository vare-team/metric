import SdcStat from '../models/sdc-stat.js';
import { literal } from 'sequelize';

export default async function (req, res) {
	await SdcStat.upsert({ date: new Date(), ups: literal('COALESCE(ups, 0) + 1') });
	res.end();
}
