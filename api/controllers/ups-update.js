import SdcStat from '../models/sdc-stat.js';

export default async function (req, res) {
	const upTime = new Date();
	const [stat, created] = await SdcStat.findOrCreate({
		where: { date: upTime },
		defaults: { ups: 1 },
	});

	if (!created) await stat.increment(['ups']);
	res.end();
}
